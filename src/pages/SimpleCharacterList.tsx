import React from 'react'
import { Typography, Card, Button, Space } from 'antd'
import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const SimpleCharacterList: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={3} style={{ margin: 0 }}>
            AI角色管理（简化版）
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
      </div>

      <Card>
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <UserOutlined style={{ fontSize: 48, marginBottom: 16, color: '#1890ff' }} />
          <div>
            <Title level={4}>简化的角色列表页面</Title>
            <Text type="secondary">
              这是一个不依赖数据上下文的简化版本，用于测试路由是否正常工作。
            </Text>
          </div>
          <div style={{ marginTop: 24 }}>
            <Space>
              <Button onClick={() => navigate('/test')}>
                测试页面
              </Button>
              <Button onClick={() => navigate('/config')}>
                通用配置
              </Button>
              <Button type="primary" ghost onClick={() => navigate('/characters')}>
                完整角色列表
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SimpleCharacterList 