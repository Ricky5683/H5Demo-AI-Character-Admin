import React, { useState, useEffect } from 'react'
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Switch,
  message,
  Space,
  Typography,
} from 'antd'
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '@/contexts/DataContext'
import { VALIDATION_RULES } from '@/utils/constants'

const { TextArea } = Input
const { Title } = Typography

const TemplateForm: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id

  const { addTemplate, updateTemplate, getTemplate } = useData()
  const [loading, setLoading] = useState(false)

  // 初始化表单数据
  useEffect(() => {
    if (isEdit && id) {
      const existingTemplate = getTemplate(id)
      if (existingTemplate) {
        form.setFieldsValue({
          name: existingTemplate.name.zh,
          content: existingTemplate.content.zh,
          isActive: existingTemplate.isActive || true,
        })
      } else {
        message.error('模板不存在')
        navigate('/templates')
      }
    } else {
      form.setFieldsValue({
        isActive: true,
      })
    }
  }, [isEdit, id, getTemplate, form, navigate])

  // 提交表单
  const handleSubmit = async (values: any) => {
    setLoading(true)

    try {
      const templateData = {
        name: { zh: values.name, en: '', ar: '' },
        description: { zh: values.name, en: '', ar: '' },
        content: { zh: values.content, en: '', ar: '' },
        category: 'general',
        isActive: values.isActive,
      }

      if (isEdit && id) {
        updateTemplate(id, templateData)
        message.success('更新成功')
      } else {
        addTemplate(templateData)
        message.success('创建成功')
      }

      navigate('/templates')
    } catch (error) {
      console.error('Submit error:', error)
      message.error('操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/templates')}
          >
            返回列表
          </Button>
          <Title level={3} style={{ margin: 0 }}>
            {isEdit ? '编辑模板' : '新增模板'}
          </Title>
        </Space>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Card title="基本信息" style={{ marginBottom: 24 }}>
          <Form.Item
            name="name"
            label="模板名称"
            rules={[VALIDATION_RULES.TEMPLATE.NAME]}
          >
            <Input placeholder="输入模板名称" maxLength={100} />
          </Form.Item>

          <Form.Item
            name="content"
            label="SystemPrompt内容"
            rules={[VALIDATION_RULES.TEMPLATE.CONTENT]}
            tooltip="用于指导AI行为的系统提示词"
          >
            <TextArea
              rows={12}
              placeholder="输入SystemPrompt内容，例如：You are a helpful and friendly AI assistant..."
              maxLength={15000}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="isActive"
            label="状态"
            valuePropName="checked"
            tooltip="是否启用该模板"
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Card>

        <Card>
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={() => navigate('/templates')}>
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
              >
                {isEdit ? '保存修改' : '创建模板'}
              </Button>
            </Space>
          </div>
        </Card>
      </Form>
    </div>
  )
}

export default TemplateForm 