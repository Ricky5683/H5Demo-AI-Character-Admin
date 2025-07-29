// 语言选项
export const LANGUAGES = [
  { key: 'zh', label: '中文', flag: '🇨🇳' },
  { key: 'en', label: 'English', flag: '🇺🇸' },
  { key: 'ar', label: 'العربية', flag: '🇸🇦' },
]

// 性别选项
export const GENDER_OPTIONS = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: '其他' },
]

// 权限选项
export const PERMISSION_OPTIONS = [
  { value: 'public', label: '公开' },
  { value: 'private', label: '私有' },
]

// 模板分类选项
export const TEMPLATE_CATEGORIES = [
  { value: 'welcome', label: '欢迎消息' },
  { value: 'support', label: '技术支持' },
  { value: 'product', label: '产品介绍' },
  { value: 'faq', label: '常见问题' },
  { value: 'other', label: '其他' },
]

// 分页配置
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],
  SHOW_SIZE_CHANGER: true,
  SHOW_QUICK_JUMPER: true,
} as const

// 文件上传配置
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  MAX_DISPLAY_IMAGES: 6,
} as const

// 表单验证规则
export const VALIDATION_RULES = {
  CHARACTER: {
    NICKNAME: { required: true, message: '请输入角色昵称' },
    REGION: { required: true, message: '请输入角色地区' },
    PROFESSION: { required: true, message: '请输入角色职业' },
    INTRODUCTION: { required: true, message: '请输入角色介绍' },
    GREETING: { required: false }, // 改为非必填
    SYSTEM_PROMPT: { required: true, message: '请输入系统提示词' },
    AGE: { 
      required: true, 
      type: 'number', 
      min: 1, 
      max: 200, 
      message: '年龄必须在1-200之间' 
    },
  },
  TEMPLATE: {
    NAME: { required: true, message: '请输入模板名称' },
    CONTENT: { 
      required: true, 
      message: '请输入模板内容',
      max: 15000 // 更新限制为15000
    },
  },
  PHONE: {
    PATTERN: /^(\+\d{1,3}[- ]?)?\d{10,15}$/, // 支持国别码的电话号码格式
    MESSAGE: '请输入有效的手机号码（支持国际格式，如+86 13800138000）'
  }
} as const

// 默认值
export const DEFAULT_VALUES = {
  CHARACTER: {
    AGE: 25,
    GENDER: 'female' as const,
    PERMISSION: 'public' as const,
    AVATAR: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=150&h=150&fit=crop&crop=face',
  },
  TEMPLATE: {
    CATEGORY: 'other',
    IS_ACTIVE: true,
  }
} as const

// 菜单配置
export const MENU_ITEMS = [
  {
    key: 'characters',
    label: 'AI角色管理',
    icon: 'UserOutlined',
    path: '/characters'
  },
  {
    key: 'templates',
    label: '模板管理',
    icon: 'FileTextOutlined',
    path: '/templates'
  },
  {
    key: 'config',
    label: '通用配置',
    icon: 'SettingOutlined',
    path: '/config'
  }
] as const 