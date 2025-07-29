import React, { useState } from 'react'
import { Modal, List, Input, Button, message, Popconfirm, Empty, Form } from 'antd'
import { DeleteOutlined, PlusOutlined, PhoneOutlined } from '@ant-design/icons'
import { useData } from '@/contexts/DataContext'
import { VALIDATION_RULES } from '@/utils/constants'

interface WhitelistModalProps {
  visible: boolean
  onCancel: () => void
  characterId: string
}

const WhitelistModal: React.FC<WhitelistModalProps> = ({
  visible,
  onCancel,
  characterId,
}) => {
  const { characters, addToWhitelist, removeFromWhitelist } = useData()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const character = characters.find(c => c.id === characterId)
  const whitelist = Array.isArray(character?.whitelist) ? character.whitelist : []

  // 添加手机号
  const handleAdd = async (values: { phone: string }) => {
    const phone = values.phone.trim()
    
    if (whitelist.includes(phone)) {
      message.warning('该手机号码已存在')
      return
    }

    setLoading(true)
    try {
      addToWhitelist(characterId, phone)
      form.resetFields()
      message.success('添加成功')
    } catch (error) {
      message.error('添加失败')
    } finally {
      setLoading(false)
    }
  }

  // 删除手机号
  const handleDelete = (phone: string) => {
    removeFromWhitelist(characterId, phone)
    message.success('删除成功')
  }

  return (
    <Modal
      title={`白名单管理 - ${character?.nickname?.zh || '未知角色'}`}
      open={visible}
      onCancel={onCancel}
      width={600}
      footer={null}
    >
      <div style={{ marginBottom: 16 }}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleAdd}
          style={{ width: '100%' }}
        >
          <Form.Item
            name="phone"
            style={{ flex: 1 }}
            rules={[
              { required: true, message: '请输入手机号码' },
              { 
                pattern: VALIDATION_RULES.PHONE.PATTERN,
                message: VALIDATION_RULES.PHONE.MESSAGE
              }
            ]}
          >
            <Input
              placeholder="请输入手机号码（支持国际格式，如+86 13800138000）"
              maxLength={20}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              loading={loading}
            >
              添加
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div
        style={{
          maxHeight: 300,
          overflowY: 'auto',
          border: '1px solid #f0f0f0',
          borderRadius: 6,
          padding: whitelist.length === 0 ? 0 : 8,
        }}
      >
        {whitelist.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="暂无白名单用户"
            style={{ padding: '40px 0' }}
          />
        ) : (
          <List
            dataSource={whitelist}
            renderItem={(phone) => (
              <List.Item
                actions={[
                  <Popconfirm
                    key="delete"
                    title="确认删除这个手机号码吗？"
                    onConfirm={() => handleDelete(phone)}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                    />
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={<PhoneOutlined style={{ color: '#1890ff' }} />}
                  title={phone}
                />
              </List.Item>
            )}
          />
        )}
      </div>

      <div
        style={{
          marginTop: 16,
          padding: 12,
          background: '#fafafa',
          borderRadius: 6,
          fontSize: 12,
          color: '#666',
        }}
      >
        <div>• 白名单用户可以无限制与此AI角色对话</div>
        <div>• 支持国际手机号码格式，如：+86 13800138000, +1 555-1234567</div>
        <div>• 当前白名单用户数量：{whitelist.length}</div>
      </div>
    </Modal>
  )
}

export default WhitelistModal 