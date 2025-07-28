import React, { useState } from 'react'
import { Modal, List, Input, Button, message, Popconfirm, Empty } from 'antd'
import { DeleteOutlined, PlusOutlined, PhoneOutlined } from '@ant-design/icons'
import { useData } from '@/contexts/DataContext'
import { VALIDATION_RULES } from '@/utils/constants'

interface WhitelistModalProps {
  open: boolean
  onCancel: () => void
  characterId: string
  characterName: string
}

const WhitelistModal: React.FC<WhitelistModalProps> = ({
  open,
  onCancel,
  characterId,
  characterName,
}) => {
  const [newPhone, setNewPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const { characters, addToWhitelist, removeFromWhitelist } = useData()

  const character = characters.find(c => c.id === characterId)
  const whitelist = character?.whitelist || []

  // 添加手机号
  const handleAdd = async () => {
    if (!newPhone.trim()) {
      message.error('请输入手机号')
      return
    }

    // 验证手机号格式
    if (!VALIDATION_RULES.PHONE.pattern.test(newPhone)) {
      message.error(VALIDATION_RULES.PHONE.message)
      return
    }

    // 检查重复
    if (whitelist.includes(newPhone)) {
      message.error('该手机号已存在')
      return
    }

    setLoading(true)
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      addToWhitelist(characterId, newPhone)
      setNewPhone('')
      message.success('添加成功')
    } catch (error) {
      message.error('添加失败')
    } finally {
      setLoading(false)
    }
  }

  // 移除手机号
  const handleRemove = async (phone: string) => {
    setLoading(true)
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 300))
      
      removeFromWhitelist(characterId, phone)
      message.success('移除成功')
    } catch (error) {
      message.error('移除失败')
    } finally {
      setLoading(false)
    }
  }

  // 处回车键添加
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <Modal
      title={
        <div>
          <PhoneOutlined style={{ marginRight: 8 }} />
          白名单管理 - {characterName}
        </div>
      }
      open={open}
      onCancel={onCancel}
      width={600}
      footer={null}
    >
      <div style={{ marginBottom: 16 }}>
        <Input.Group compact style={{ display: 'flex' }}>
          <Input
            placeholder="请输入手机号（如：13800138000）"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ flex: 1 }}
            maxLength={11}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            loading={loading}
          >
            添加
          </Button>
        </Input.Group>
      </div>

      <div
        style={{
          maxHeight: 400,
          overflowY: 'auto',
          border: '1px solid #f0f0f0',
          borderRadius: 6,
          padding: 8,
        }}
      >
        {whitelist.length === 0 ? (
          <Empty
            description="暂无白名单用户"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ padding: '40px 0' }}
          />
        ) : (
          <List
            dataSource={whitelist}
            renderItem={(phone, index) => (
              <List.Item
                key={phone}
                actions={[
                  <Popconfirm
                    title="确认移除"
                    description={`确定要将 ${phone} 从白名单中移除吗？`}
                    onConfirm={() => handleRemove(phone)}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                    />
                  </Popconfirm>
                ]}
                style={{
                  padding: '8px 12px',
                  backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff',
                  borderRadius: 4,
                  margin: '4px 0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 14 }}>
                    {phone}
                  </span>
                </div>
              </List.Item>
            )}
          />
        )}
      </div>

      <div
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: '#f6f8fa',
          borderRadius: 6,
          fontSize: 12,
          color: '#666',
        }}
      >
        <div style={{ marginBottom: 4 }}>
          <strong>说明：</strong>
        </div>
        <div>• 只有白名单中的手机号才能访问该私有AI角色</div>
        <div>• 手机号格式：以1开头的11位数字</div>
        <div>• 当前白名单用户数量：{whitelist.length}</div>
      </div>
    </Modal>
  )
}

export default WhitelistModal 