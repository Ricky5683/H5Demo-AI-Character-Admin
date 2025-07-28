// 多语言支持的文本类型
export interface MultiLangText {
  zh: string
  en: string
  ar: string
}

// 用户类型
export interface User {
  id: string
  username: string
  password?: string // 仅在创建/登录时使用
}

// AI角色类型
export interface Character {
  id: string
  botId: string // 全局唯一的bot ID
  avatar: string
  gender: 'male' | 'female' | 'other'
  age: number
  permission: 'public' | 'private'
  nickname: MultiLangText
  region: MultiLangText
  profession: MultiLangText
  introduction: MultiLangText
  tags: {
    zh: string[]
    en: string[]
    ar: string[]
  }
  greeting: MultiLangText
  displayImages: string[]
  systemPrompt: string
  whitelist: string[] // 白名单手机号列表
  createdAt: string
  updatedAt: string
}

// 模板类型
export interface Template {
  id: string
  name: MultiLangText
  description: MultiLangText
  content: MultiLangText
  category: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// 通用配置类型
export interface Config {
  defaultAvatars: string[]
}

// 表单中的语言类型
export type Language = 'zh' | 'en' | 'ar'

// 权限类型
export type Permission = 'public' | 'private'

// 性别类型
export type Gender = 'male' | 'female' | 'other'

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// 分页参数
export interface PaginationParams {
  page: number
  pageSize: number
  search?: string
}

// 分页响应
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

// 文件上传响应
export interface UploadResponse {
  url: string
  filename: string
} 