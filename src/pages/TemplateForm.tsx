import React, { useState, useEffect } from 'react'
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  message,
  Typography,
  Space,
  Switch,
  Divider,
} from 'antd'
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '@/contexts/DataContext'
import { Template, Language, MultiLangText } from '@/types'
import {
  TEMPLATE_CATEGORIES,
  VALIDATION_RULES,
  DEFAULT_VALUES,
} from '@/utils/constants'
import LanguageTabs from '@/components/LanguageTabs'

const { Title } = Typography
const { TextArea } = Input

const TemplateForm: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  
  const { templates, addTemplate, updateTemplate, getTemplate } = useData()
  const [loading, setLoading] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language>('zh')
  const [template, setTemplate] = useState<Template | null>(null)

  // 初始化表单数据
  useEffect(() => {
    if (isEdit && id) {
      const existingTemplate = getTemplate(id)
      if (existingTemplate) {
        setTemplate(existingTemplate)
        // 设置表单值（当前语言的值）
        form.setFieldsValue({
          ...existingTemplate,
          name: existingTemplate.name[currentLanguage],
          description: existingTemplate.description[currentLanguage],
          content: existingTemplate.content[currentLanguage],
        })
      } else {
        message.error('模板不存在')
        navigate('/templates')
      }
    } else {
      // 新增模式，设置默认值
      form.setFieldsValue({
        category: DEFAULT_VALUES.TEMPLATE.CATEGORY,
        isActive: DEFAULT_VALUES.TEMPLATE.IS_ACTIVE,
      })
    }
  }, [isEdit, id, getTemplate, form, navigate, currentLanguage])

  // 语言切换时更新表单值
  useEffect(() => {
    if (template) {
      form.setFieldsValue({
        name: template.name[currentLanguage],
        description: template.description[currentLanguage],
        content: template.content[currentLanguage],
      })
    }
  }, [currentLanguage, template, form])

  // 创建多语言文本对象
  const createMultiLangText = (
    currentValue: string,
    existingMultiLang?: MultiLangText
  ): MultiLangText => {
    const base = existingMultiLang || { zh: '', en: '', ar: '' }
    return {
      ...base,
      [currentLanguage]: currentValue || '',
    }
  }

  // 处理表单提交
  const handleSubmit = async (values: any) => {
    setLoading(true)
    
    try {
      // 构建多语言数据
      const multiLangData = {
        name: createMultiLangText(values.name, template?.name),
        description: createMultiLangText(values.description, template?.description),
        content: createMultiLangText(values.content, template?.content),
      }

      const templateData = {
        category: values.category,
        isActive: values.isActive,
        ...multiLangData,
      }

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (isEdit && template) {
        updateTemplate(template.id, templateData)
        message.success('更新成功')
      } else {
        addTemplate(templateData)
        message.success('创建成功')
      }

      navigate('/templates')
    } catch (error) {
      message.error(isEdit ? '更新失败' : '创建失败')
      console.error('Submit error:', error)
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

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          scrollToFirstError
        >
          <Row gutter={24}>
            {/* 左侧：基本信息 */}
            <Col xs={24} lg={8}>
              <Card title="基本信息" size="small">
                <Form.Item
                  name="category"
                  label="分类"
                  rules={[VALIDATION_RULES.REQUIRED]}
                >
                  <Select options={TEMPLATE_CATEGORIES} />
                </Form.Item>

                <Form.Item
                  name="isActive"
                  label="状态"
                  valuePropName="checked"
                >
                  <Switch
                    checkedChildren="启用"
                    unCheckedChildren="禁用"
                  />
                </Form.Item>
              </Card>
            </Col>

            {/* 右侧：多语言信息 */}
            <Col xs={24} lg={16}>
              <Card
                title="多语言信息"
                size="small"
                extra={
                  <LanguageTabs
                    activeLanguage={currentLanguage}
                    onChange={setCurrentLanguage}
                  />
                }
              >
                <Form.Item
                  name="name"
                  label="模板名称"
                  rules={[
                    VALIDATION_RULES.REQUIRED,
                    { max: VALIDATION_RULES.MAX_LENGTH.TEMPLATE_NAME, message: `最多${VALIDATION_RULES.MAX_LENGTH.TEMPLATE_NAME}个字符` }
                  ]}
                >
                  <Input 
                    placeholder="输入模板名称" 
                    maxLength={VALIDATION_RULES.MAX_LENGTH.TEMPLATE_NAME} 
                  />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="模板描述"
                  rules={[
                    VALIDATION_RULES.REQUIRED,
                    { max: VALIDATION_RULES.MAX_LENGTH.TEMPLATE_DESCRIPTION, message: `最多${VALIDATION_RULES.MAX_LENGTH.TEMPLATE_DESCRIPTION}个字符` }
                  ]}
                >
                  <TextArea
                    rows={3}
                    placeholder="输入模板描述"
                    showCount
                    maxLength={VALIDATION_RULES.MAX_LENGTH.TEMPLATE_DESCRIPTION}
                  />
                </Form.Item>

                <Form.Item
                  name="content"
                  label="模板内容"
                  rules={[
                    VALIDATION_RULES.REQUIRED,
                    { max: VALIDATION_RULES.MAX_LENGTH.TEMPLATE_CONTENT, message: `最多${VALIDATION_RULES.MAX_LENGTH.TEMPLATE_CONTENT}个字符` }
                  ]}
                >
                  <TextArea
                    rows={12}
                    placeholder="输入模板内容..."
                    showCount
                    maxLength={VALIDATION_RULES.MAX_LENGTH.TEMPLATE_CONTENT}
                  />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <Divider />

          <div style={{ textAlign: 'center' }}>
            <Space>
              <Button
                size="large"
                onClick={() => navigate('/templates')}
              >
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                icon={<SaveOutlined />}
              >
                {loading ? '保存中...' : (isEdit ? '更新模板' : '创建模板')}
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default TemplateForm 