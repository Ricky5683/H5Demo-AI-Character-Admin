import React, { useState, useMemo } from 'react'
import {
  Button,
  Table,
  Input,
  Space,
  Tag,
  Avatar,
  Popconfirm,
  message,
  Typography,
  Card,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { useData } from '@/contexts/DataContext'
import { Character } from '@/types'
import { PAGINATION_CONFIG, PERMISSION_OPTIONS, GENDER_OPTIONS } from '@/utils/constants'
import WhitelistModal from '@/components/WhitelistModal'

const { Search } = Input
const { Title, Text } = Typography

const CharacterList: React.FC = () => {
  const navigate = useNavigate()
  const { characters, deleteCharacter } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [whitelistModal, setWhitelistModal] = useState<{
    open: boolean
    characterId: string
    characterName: string
  }>({
    open: false,
    characterId: '',
    characterName: '',
  })

  // 过滤数据
  const filteredCharacters = useMemo(() => {
    if (!searchTerm.trim()) return characters

    return characters.filter(character => {
      const term = searchTerm.toLowerCase()
      return (
        character.botId.toLowerCase().includes(term) ||
        character.nickname.zh.toLowerCase().includes(term) ||
        character.nickname.en.toLowerCase().includes(term) ||
        character.nickname.ar.toLowerCase().includes(term)
      )
    })
  }, [characters, searchTerm])

  // 处理删除
  const handleDelete = async (character: Character) => {
    try {
      deleteCharacter(character.id)
      message.success('删除成功')
    } catch (error) {
      message.error('删除失败')
    }
  }

  // 处理白名单管理
  const handleWhitelistManage = (character: Character) => {
    setWhitelistModal({
      open: true,
      characterId: character.id,
      characterName: character.nickname.zh,
    })
  }

  // 表格列配置
  const columns = [
    {
      title: 'Bot ID',
      dataIndex: 'botId',
      key: 'botId',
      width: 150,
      render: (botId: string) => (
        <Text code style={{ fontSize: 12 }}>
          {botId}
        </Text>
      ),
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string) => (
        <Avatar src={avatar} size={48} />
      ),
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      render: (nickname: Character['nickname'], record: Character) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>
            {nickname.zh}
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>
            {record.profession.zh} · {record.region.zh}
          </div>
        </div>
      ),
    },
    {
      title: '性别/年龄',
      key: 'genderAge',
      width: 100,
      render: (record: Character) => {
        const genderLabel = GENDER_OPTIONS.find(g => g.value === record.gender)?.label
        return `${genderLabel} / ${record.age}岁`
      },
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
      width: 100,
      render: (permission: Character['permission']) => {
        const option = PERMISSION_OPTIONS.find(p => p.value === permission)
        return (
          <Tag color={permission === 'public' ? 'green' : 'orange'}>
            {option?.label}
          </Tag>
        )
      },
    },
    {
      title: '白名单用户',
      key: 'whitelistCount',
      width: 120,
      render: (record: Character) => (
        <div style={{ textAlign: 'center' }}>
          {record.permission === 'private' ? (
            <Tag color="blue">
              {record.whitelist.length} 人
            </Tag>
          ) : (
            <Text type="secondary">-</Text>
          )}
        </div>
      ),
    },
    {
      title: '最后更新',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 140,
      sorter: (a: Character, b: Character) => 
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
      width: 200,
      render: (record: Character) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/characters/edit/${record.id}`)}
          >
            查看
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => navigate(`/characters/edit/${record.id}`)}
          >
            编辑
          </Button>
          {record.permission === 'private' && (
            <Button
              type="link"
              size="small"
              icon={<TeamOutlined />}
              onClick={() => handleWhitelistManage(record)}
            >
              白名单
            </Button>
          )}
          <Popconfirm
            title="确认删除"
            description={
              <div>
                <div>确定要删除角色 <strong>{record.nickname.zh}</strong> 吗？</div>
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
            AI角色管理
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/characters/new')}
            size="large"
          >
            新增AI角色
          </Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Search
              placeholder="搜索角色昵称或Bot ID"
              style={{ width: 300 }}
              onSearch={setSearchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
          
          <div style={{ color: '#666', fontSize: 14 }}>
            共 {filteredCharacters.length} 个角色
          </div>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredCharacters}
          rowKey="id"
          pagination={{
            ...PAGINATION_CONFIG,
            total: filteredCharacters.length,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <WhitelistModal
        open={whitelistModal.open}
        onCancel={() => setWhitelistModal({ open: false, characterId: '', characterName: '' })}
        characterId={whitelistModal.characterId}
        characterName={whitelistModal.characterName}
      />
    </div>
  )
}

export default CharacterList 