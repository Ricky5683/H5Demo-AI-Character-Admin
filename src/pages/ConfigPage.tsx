import React, { useState } from 'react'
import {
  Button,
  Card,
  Typography,
  Row,
  Col,
  message,
  Popconfirm,
  Upload,
  Modal,
} from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { useData } from '@/contexts/DataContext'
import { UPLOAD_CONFIG } from '@/utils/constants'

const { Title, Text } = Typography

const ConfigPage: React.FC = () => {
  const { config, updateConfig } = useData()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  // 模拟上传到OSS
  const mockUploadToOSS = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUrl = URL.createObjectURL(file)
        resolve(mockUrl)
      }, 1000)
    })
  }

  // 处理头像上传
  const handleAvatarUpload = async (options: any) => {
    const { file, onSuccess, onError } = options

    try {
      // 检查文件类型
      const isValidType = UPLOAD_CONFIG.ACCEPTED_IMAGE_TYPES.includes(file.type)
      if (!isValidType) {
        message.error('只能上传 JPG/PNG/GIF/WebP 格式的图片！')
        onError(new Error('Invalid file type'))
        return
      }

      // 检查文件大小
      const isValidSize = file.size <= UPLOAD_CONFIG.MAX_FILE_SIZE
      if (!isValidSize) {
        message.error('图片大小不能超过 5MB！')
        onError(new Error('File too large'))
        return
      }

      // 模拟上传
      const url = await mockUploadToOSS(file)
      
      // 添加到默认头像列表
      const currentAvatars = Array.isArray(config.defaultAvatars) ? config.defaultAvatars : []
      const newAvatars = [...currentAvatars, url]
      updateConfig({ defaultAvatars: newAvatars })
      
      message.success('头像上传成功')
      onSuccess({ url }, file)
    } catch (error) {
      console.error('Upload failed:', error)
      message.error('上传失败')
      onError(error)
    }
  }

  // 删除默认头像
  const handleDeleteAvatar = (avatarUrl: string) => {
    const currentAvatars = Array.isArray(config.defaultAvatars) ? config.defaultAvatars : []
    const newAvatars = currentAvatars.filter(url => url !== avatarUrl)
    updateConfig({ defaultAvatars: newAvatars })
    message.success('删除成功')
  }

  // 预览头像
  const handlePreview = (avatarUrl: string) => {
    setPreviewImage(avatarUrl)
    setPreviewTitle('默认头像预览')
    setPreviewOpen(true)
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          通用配置
        </Title>
        <Text type="secondary">
          管理系统的通用配置信息
        </Text>
      </div>

      <Card title="默认头像管理" style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <Upload
            customRequest={handleAvatarUpload}
            showUploadList={false}
            accept={UPLOAD_CONFIG.ACCEPTED_IMAGE_TYPES.join(',')}
          >
            <Button type="primary" icon={<PlusOutlined />}>
              上传新头像
            </Button>
          </Upload>
          <Text type="secondary" style={{ marginLeft: 12 }}>
            支持 JPG、PNG、GIF、WebP 格式，大小不超过 5MB
          </Text>
        </div>

        <div
          style={{
            border: '1px solid #f0f0f0',
            borderRadius: 8,
            padding: 16,
            minHeight: 200,
            backgroundColor: '#fafafa',
          }}
        >
          {!Array.isArray(config.defaultAvatars) || config.defaultAvatars.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 0',
                color: '#999',
              }}
            >
              <PlusOutlined style={{ fontSize: 48, marginBottom: 16 }} />
              <div>暂无默认头像</div>
              <div style={{ fontSize: 12, marginTop: 8 }}>
                点击上方按钮上传头像
              </div>
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {config.defaultAvatars.map((avatarUrl, index) => (
                <Col xs={12} sm={8} md={6} lg={4} key={index}>
                  <Card
                    hoverable
                    size="small"
                    cover={
                      <div
                        style={{
                          height: 120,
                          background: `url(${avatarUrl}) center/cover`,
                          borderRadius: '8px 8px 0 0',
                        }}
                      />
                    }
                    actions={[
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => handlePreview(avatarUrl)}
                        key="preview"
                      />,
                      <Popconfirm
                        title="确认删除"
                        description="确定要删除这个默认头像吗？"
                        onConfirm={() => handleDeleteAvatar(avatarUrl)}
                        okText="确认"
                        cancelText="取消"
                        key="delete"
                      >
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                        />
                      </Popconfirm>,
                    ]}
                  >
                    <Card.Meta
                      title={`头像 ${index + 1}`}
                      description={
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          默认头像
                        </Text>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
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
          <div>• 默认头像将在创建AI角色时作为头像选项提供</div>
          <div>• 建议上传尺寸为 150x150 像素的正方形图片</div>
          <div>• 当前默认头像数量：{Array.isArray(config.defaultAvatars) ? config.defaultAvatars.length : 0}</div>
        </div>
      </Card>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default ConfigPage 