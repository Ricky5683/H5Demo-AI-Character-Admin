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
  
  const { characters, addCharacter, updateCharacter, getCharacter } = useData()
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
          tags: existingCharacter.tags[currentLanguage],
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
        tags: character.tags[currentLanguage],
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
          ...character?.tags || { zh: [], en: [], ar: [] },
          [currentLanguage]: values.tags || [],
        },
      }

      const characterData = {
        avatar: values.avatar,
        gender: values.gender,
        age: values.age,
        permission: values.permission,
        displayImages: values.displayImages || [],
        systemPrompt: values.systemPrompt || '',
        whitelist: character?.whitelist || [],
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
                  rules={[VALIDATION_RULES.REQUIRED]}
                >
                  <ImageUpload maxCount={1} />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="gender"
                      label="性别"
                      rules={[VALIDATION_RULES.REQUIRED]}
                    >
                      <Select options={GENDER_OPTIONS} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="age"
                      label="年龄"
                      rules={[VALIDATION_RULES.REQUIRED, VALIDATION_RULES.AGE]}
                    >
                      <InputNumber min={1} max={150} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="permission"
                  label="权限设置"
                  rules={[VALIDATION_RULES.REQUIRED]}
                >
                  <Select options={PERMISSION_OPTIONS} />
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
                  label="System Prompt"
                  help="系统提示词，用于指导AI的行为和回复风格"
                  rules={[
                    { max: VALIDATION_RULES.MAX_LENGTH.SYSTEM_PROMPT, message: `最多${VALIDATION_RULES.MAX_LENGTH.SYSTEM_PROMPT}个字符` }
                  ]}
                >
                  <TextArea
                    rows={6}
                    placeholder="输入系统提示词，例如：You are a helpful and friendly AI assistant..."
                    showCount
                    maxLength={VALIDATION_RULES.MAX_LENGTH.SYSTEM_PROMPT}
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
                  label="昵称"
                  rules={[
                    VALIDATION_RULES.REQUIRED,
                    { max: VALIDATION_RULES.MAX_LENGTH.NICKNAME, message: `最多${VALIDATION_RULES.MAX_LENGTH.NICKNAME}个字符` }
                  ]}
                >
                  <Input placeholder="输入角色昵称" maxLength={VALIDATION_RULES.MAX_LENGTH.NICKNAME} />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="region"
                      label="地区"
                      rules={[
                        VALIDATION_RULES.REQUIRED,
                        { max: VALIDATION_RULES.MAX_LENGTH.REGION, message: `最多${VALIDATION_RULES.MAX_LENGTH.REGION}个字符` }
                      ]}
                    >
                      <Input placeholder="如：北京" maxLength={VALIDATION_RULES.MAX_LENGTH.REGION} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="profession"
                      label="职业"
                      rules={[
                        VALIDATION_RULES.REQUIRED,
                        { max: VALIDATION_RULES.MAX_LENGTH.PROFESSION, message: `最多${VALIDATION_RULES.MAX_LENGTH.PROFESSION}个字符` }
                      ]}
                    >
                      <Input placeholder="如：AI助手" maxLength={VALIDATION_RULES.MAX_LENGTH.PROFESSION} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="introduction"
                  label="介绍"
                  rules={[
                    VALIDATION_RULES.REQUIRED,
                    { max: VALIDATION_RULES.MAX_LENGTH.INTRODUCTION, message: `最多${VALIDATION_RULES.MAX_LENGTH.INTRODUCTION}个字符` }
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="输入角色介绍"
                    showCount
                    maxLength={VALIDATION_RULES.MAX_LENGTH.INTRODUCTION}
                  />
                </Form.Item>

                <Form.Item
                  name="tags"
                  label="标签"
                  help="输入标签后按回车键添加"
                >
                  <Select
                    mode="tags"
                    placeholder="添加标签"
                    maxTagCount={5}
                    maxTagTextLength={VALIDATION_RULES.MAX_LENGTH.TAG}
                  />
                </Form.Item>

                <Form.Item
                  name="greeting"
                  label="开场白"
                  rules={[
                    VALIDATION_RULES.REQUIRED,
                    { max: VALIDATION_RULES.MAX_LENGTH.GREETING, message: `最多${VALIDATION_RULES.MAX_LENGTH.GREETING}个字符` }
                  ]}
                >
                  <TextArea
                    rows={3}
                    placeholder="输入角色的开场白"
                    showCount
                    maxLength={VALIDATION_RULES.MAX_LENGTH.GREETING}
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