import React, { useState, useEffect } from 'react'
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Card,
  Row,
  Col,
  message,
  Typography,
  Tag,
  Space,
  Divider,
} from 'antd'
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '@/contexts/DataContext'
import { Character, Language, MultiLangText } from '@/types'
import {
  GENDER_OPTIONS,
  PERMISSION_OPTIONS,
  VALIDATION_RULES,
  DEFAULT_VALUES,
} from '@/utils/constants'
import LanguageTabs from '@/components/LanguageTabs'
import ImageUpload from '@/components/ImageUpload'

const { Title } = Typography
const { TextArea } = Input

const CharacterForm: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  
  const { addCharacter, updateCharacter, getCharacter } = useData()
  const [loading, setLoading] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language>('zh')
  const [character, setCharacter] = useState<Character | null>(null)

  // 初始化表单数据
  useEffect(() => {
    if (isEdit && id) {
      const existingCharacter = getCharacter(id)
      if (existingCharacter) {
        setCharacter(existingCharacter)
        // 设置表单值（当前语言的值）
        form.setFieldsValue({
          ...existingCharacter,
          nickname: existingCharacter.nickname[currentLanguage],
          region: existingCharacter.region[currentLanguage],
          profession: existingCharacter.profession[currentLanguage],
          introduction: existingCharacter.introduction[currentLanguage],
          tags: Array.isArray(existingCharacter.tags[currentLanguage]) ? existingCharacter.tags[currentLanguage] : [],
          greeting: existingCharacter.greeting[currentLanguage],
        })
      } else {
        message.error('角色不存在')
        navigate('/characters')
      }
    } else {
      // 新增模式，设置默认值
      form.setFieldsValue({
        avatar: DEFAULT_VALUES.CHARACTER.AVATAR,
        gender: DEFAULT_VALUES.CHARACTER.GENDER,
        age: DEFAULT_VALUES.CHARACTER.AGE,
        permission: DEFAULT_VALUES.CHARACTER.PERMISSION,
        displayImages: [],
        tags: [],
      })
    }
  }, [isEdit, id, getCharacter, form, navigate, currentLanguage])

  // 语言切换时更新表单值
  useEffect(() => {
    if (character) {
      form.setFieldsValue({
        nickname: character.nickname[currentLanguage],
        region: character.region[currentLanguage],
        profession: character.profession[currentLanguage],
        introduction: character.introduction[currentLanguage],
        tags: Array.isArray(character.tags[currentLanguage]) ? character.tags[currentLanguage] : [],
        greeting: character.greeting[currentLanguage],
      })
    }
  }, [currentLanguage, character, form])

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
        nickname: createMultiLangText(values.nickname, character?.nickname),
        region: createMultiLangText(values.region, character?.region),
        profession: createMultiLangText(values.profession, character?.profession),
        introduction: createMultiLangText(values.introduction, character?.introduction),
        greeting: createMultiLangText(values.greeting, character?.greeting),
        tags: {
          ...(character?.tags && typeof character.tags === 'object' ? character.tags : { zh: [], en: [], ar: [] }),
          [currentLanguage]: Array.isArray(values.tags) ? values.tags : [],
        },
      }

      const characterData = {
        avatar: values.avatar,
        gender: values.gender,
        age: values.age,
        permission: values.permission,
        displayImages: Array.isArray(values.displayImages) ? values.displayImages : [],
        systemPrompt: values.systemPrompt || '',
        whitelist: Array.isArray(character?.whitelist) ? character.whitelist : [],
        ...multiLangData,
      }

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (isEdit && character) {
        updateCharacter(character.id, characterData)
        message.success('更新成功')
      } else {
        addCharacter(characterData)
        message.success('创建成功')
      }

      navigate('/characters')
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
            onClick={() => navigate('/characters')}
          >
            返回列表
          </Button>
          <Title level={3} style={{ margin: 0 }}>
            {isEdit ? '编辑AI角色' : '新增AI角色'}
          </Title>
          {isEdit && character && (
            <Tag color="blue">Bot ID: {character.botId}</Tag>
          )}
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
            <Col xs={24} lg={12}>
              <Card title="基本信息" size="small" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="avatar"
                  label="头像"
                  rules={[{ required: true, message: '请选择头像' }]}
                >
                  <ImageUpload maxCount={1} />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="gender"
                      label="性别"
                      rules={[{ required: true, message: '请选择性别' }]}
                    >
                      <Select placeholder="选择性别" options={GENDER_OPTIONS as any} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="age"
                      label="年龄"
                      rules={[VALIDATION_RULES.CHARACTER.AGE]}
                    >
                      <InputNumber min={1} max={150} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="permission"
                  label="权限设置"
                  rules={[{ required: true, message: '请选择权限设置' }]}
                >
                  <Select placeholder="选择权限设置" options={PERMISSION_OPTIONS as any} />
                </Form.Item>
              </Card>

              {/* 媒体信息 */}
              <Card title="媒体信息" size="small" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="displayImages"
                  label="展示图片"
                  help="最多可上传6张展示图片"
                >
                  <ImageUpload maxCount={6} />
                </Form.Item>
              </Card>

              {/* 高级设置 */}
              <Card title="高级设置" size="small">
                <Form.Item
                  name="systemPrompt"
                  label="系统提示词"
                  rules={[VALIDATION_RULES.CHARACTER.SYSTEM_PROMPT]}
                >
                  <TextArea
                    rows={6}
                    placeholder="设定角色的行为准则、对话风格等"
                    maxLength={2000}
                    showCount
                  />
                </Form.Item>
              </Card>
            </Col>

            {/* 右侧：多语言信息 */}
            <Col xs={24} lg={12}>
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
                  name="nickname"
                  label="角色昵称"
                  rules={[VALIDATION_RULES.CHARACTER.NICKNAME]}
                >
                  <Input placeholder="输入AI角色的昵称" maxLength={50} />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="region"
                      label="角色地区"
                      rules={[VALIDATION_RULES.CHARACTER.REGION]}
                    >
                      <Input placeholder="输入角色所在地区" maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="profession"
                      label="角色职业"
                      rules={[VALIDATION_RULES.CHARACTER.PROFESSION]}
                    >
                      <Input placeholder="输入角色的职业" maxLength={50} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="introduction"
                  label="角色介绍"
                  rules={[VALIDATION_RULES.CHARACTER.INTRODUCTION]}
                >
                  <TextArea
                    rows={4}
                    placeholder="详细描述角色的背景、性格等"
                    maxLength={500}
                    showCount
                  />
                </Form.Item>

                <Form.Item
                  name="tags"
                  label="角色标签"
                  tooltip="用于分类和搜索的关键词"
                >
                  <Select
                    mode="tags"
                    placeholder="输入标签后按回车添加"
                    style={{ width: '100%' }}
                    options={[]}
                    maxTagCount="responsive"
                  />
                </Form.Item>

                <Form.Item
                  name="greeting"
                  label="开场白"
                  tooltip="角色在对话开始时的问候语"
                >
                  <TextArea
                    rows={3}
                    placeholder="请输入角色开场白（选填）"
                    maxLength={200}
                    showCount
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
                onClick={() => navigate('/characters')}
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
                {loading ? '保存中...' : (isEdit ? '更新角色' : '创建角色')}
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default CharacterForm 