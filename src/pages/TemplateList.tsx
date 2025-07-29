import React, { useState, useMemo } from 'react'
import { 
  Button, 
  Table, 
  Space, 
  Popconfirm, 
  Input, 
  message,
  Typography
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { useData } from '@/contexts/DataContext'
import { Template, MultiLangText } from '@/types'

const { Search } = Input
const { Title } = Typography

const TemplateList: React.FC = () => {
  const navigate = useNavigate()
  const { templates, deleteTemplate } = useData()
  const [searchTerm, setSearchTerm] = useState('')

  // 过滤数据
  const filteredTemplates = useMemo(() => {
    if (!searchTerm.trim()) return templates

    return templates.filter(template => 
      template.name.zh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.name.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.zh.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [templates, searchTerm])

  // 删除模板
  const handleDelete = (templateId: string) => {
    deleteTemplate(templateId)
    message.success('删除成功')
  }

  // 表格列配置
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => (
        <Typography.Text code style={{ fontSize: '12px' }}>
          {id.slice(0, 8)}...
        </Typography.Text>
      ),
    },
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: MultiLangText) => (
        <div>
          <div>{name.zh}</div>
          {name.en && (
            <div style={{ fontSize: '12px', color: '#999' }}>
              {name.en}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'SystemPrompt内容',
      dataIndex: 'content',
      key: 'content',
      render: (content: MultiLangText) => (
        <div style={{ maxWidth: 300 }}>
          <Typography.Text ellipsis={{ tooltip: content.zh }}>
            {content.zh}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'actions',
      width: 120,
      render: (_: any, record: Template) => (
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => navigate(`/templates/edit/${record.id}`)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description="删除后无法恢复，确定要删除这个模板吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link" size="small" danger>
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

          <div style={{ fontSize: '14px', color: '#666', marginTop: 4 }}>
            （共 {filteredTemplates.length} 个模板）
          </div>
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

      <Table
        columns={columns}
        dataSource={filteredTemplates}
        rowKey="id"
        pagination={{
          total: filteredTemplates.length,
          showTotal: (total, range) =>
            `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
        }}
      />
    </div>
  )
}

export default TemplateList 