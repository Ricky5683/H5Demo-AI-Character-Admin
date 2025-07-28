import React, { useState, useMemo } from 'react'
import {
  Button,
  Table,
  Input,
  Space,
  Tag,
  Switch,
  Popconfirm,
  message,
  Typography,
  Card,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { useData } from '@/contexts/DataContext'
import { Template } from '@/types'
import { PAGINATION_CONFIG, TEMPLATE_CATEGORIES } from '@/utils/constants'

const { Search } = Input
const { Title, Text } = Typography

const TemplateList: React.FC = () => {
  const navigate = useNavigate()
  const { templates, deleteTemplate, updateTemplate } = useData()
  const [searchTerm, setSearchTerm] = useState('')

  // 过滤数据
  const filteredTemplates = useMemo(() => {
    if (!searchTerm.trim()) return templates

    return templates.filter(template => {
      const term = searchTerm.toLowerCase()
      return (
        template.name.zh.toLowerCase().includes(term) ||
        template.name.en.toLowerCase().includes(term) ||
        template.name.ar.toLowerCase().includes(term) ||
        template.description.zh.toLowerCase().includes(term) ||
        template.description.en.toLowerCase().includes(term) ||
        template.description.ar.toLowerCase().includes(term) ||
        template.category.toLowerCase().includes(term)
      )
    })
  }, [templates, searchTerm])

  // 处理删除
  const handleDelete = async (template: Template) => {
    try {
      deleteTemplate(template.id)
      message.success('删除成功')
    } catch (error) {
      message.error('删除失败')
    }
  }

  // 处理状态切换
  const handleStatusToggle = async (template: Template, isActive: boolean) => {
    try {
      updateTemplate(template.id, { isActive })
      message.success(isActive ? '已启用' : '已禁用')
    } catch (error) {
      message.error('操作失败')
    }
  }

  // 表格列配置
  const columns = [
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: Template['name'], record: Template) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>
            {name.zh}
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>
            {record.description.zh}
          </div>
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category: string) => {
        const categoryOption = TEMPLATE_CATEGORIES.find(c => c.value === category)
        return (
          <Tag color="blue">
            {categoryOption?.label || category}
          </Tag>
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: (isActive: boolean, record: Template) => (
        <Switch
          checked={isActive}
          onChange={(checked) => handleStatusToggle(record, checked)}
          checkedChildren="启用"
          unCheckedChildren="禁用"
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
      sorter: (a: Template, b: Template) => 
        dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (createdAt: string) => (
        <div style={{ fontSize: 12 }}>
          {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
        </div>
      ),
    },
    {
      title: '最后更新',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 140,
      sorter: (a: Template, b: Template) => 
        dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix(),
      render: (updatedAt: string) => (
        <div style={{ fontSize: 12 }}>
          {dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      render: (record: Template) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => navigate(`/templates/edit/${record.id}`)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description={
              <div>
                <div>确定要删除模板 <strong>{record.name.zh}</strong> 吗？</div>
                <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
                  此操作不可恢复
                </div>
              </div>
            }
            onConfirm={() => handleDelete(record)}
            okText="确认删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={3} style={{ margin: 0 }}>
            模板管理
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/templates/new')}
            size="large"
          >
            新增模板
          </Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Search
              placeholder="搜索模板名称、描述或分类"
              style={{ width: 300 }}
              onSearch={setSearchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
          
          <div style={{ color: '#666', fontSize: 14 }}>
            共 {filteredTemplates.length} 个模板
            （启用 {filteredTemplates.filter(t => t.isActive).length} 个）
          </div>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredTemplates}
          rowKey="id"
          pagination={{
            ...PAGINATION_CONFIG,
            total: filteredTemplates.length,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  )
}

export default TemplateList 