// 语言选项
export const LANGUAGES = [
  { key: 'zh', label: '中文', flag: '🇨🇳' },
  { key: 'en', label: 'English', flag: '🇺🇸' },
  { key: 'ar', label: 'العربية', flag: '🇸🇦' },
] as const

// 性别选项
export const GENDER_OPTIONS = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: '其他' },
] as const

// 权限选项
export const PERMISSION_OPTIONS = [
  { value: 'public', label: '公开' },
  { value: 'private', label: '私有' },
] as const

// 模板分类选项
export const TEMPLATE_CATEGORIES = [
  { value: 'welcome', label: '欢迎消息' },
  { value: 'support', label: '技术支持' },
  { value: 'product', label: '产品介绍' },
  { value: 'faq', label: '常见问题' },
  { value: 'other', label: '其他' },
] as const

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
  REQUIRED: { required: true, message: '此项为必填项' },
  PHONE: {
    pattern: /^1[3-9]\d{9}$/,
    message: '请输入正确的手机号码格式'
  },
  AGE: {
    type: 'number' as const,
    min: 1,
    max: 150,
    message: '年龄必须在1-150之间'
  },
  MAX_LENGTH: {
    NICKNAME: 50,
    REGION: 50,
    PROFESSION: 50,
    INTRODUCTION: 500,
    TAG: 20,
    GREETING: 200,
    SYSTEM_PROMPT: 2000,
    TEMPLATE_NAME: 100,
    TEMPLATE_DESCRIPTION: 200,
    TEMPLATE_CONTENT: 5000,
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