# H5 Demo AI角色管理后台 (Demo版本)

这是一个基于 React + TypeScript + Vite + Ant Design 构建的AI角色管理后台系统Demo版本。该项目展示了完整的前端功能和交互流程，使用模拟数据和localStorage进行数据管理。

## 🌟 功能特性

### 🔐 用户认证
- 登录页面，支持用户名/密码认证
- JWT Token模拟认证机制
- 登录状态持久化保存

### 👤 AI角色管理
- **角色列表**: 展示所有AI角色，支持搜索和分页
- **角色创建**: 新增AI角色，支持多语言内容
- **角色编辑**: 修改现有角色信息
- **角色删除**: 删除不需要的角色
- **白名单管理**: 为私有角色管理访问白名单

### 🌍 多语言支持
- 支持中文、英文、阿拉伯语三种语言
- 语言切换标签，实时预览不同语言内容
- 多语言表单验证和数据管理

### 📝 模板管理
- **模板列表**: 查看所有消息模板
- **模板创建**: 新增多语言消息模板
- **模板编辑**: 修改模板内容和设置
- **状态管理**: 启用/禁用模板

### 🖼️ 文件上传
- 头像上传功能，模拟OSS云存储
- 展示图片上传，支持多图管理
- 图片预览和删除功能
- 文件类型和大小验证

### ⚙️ 系统配置
- 默认头像管理
- 系统参数配置
- 上传文件管理

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm/yarn/pnpm

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本
```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 部署到GitHub Pages
```bash
npm run deploy
# 或
yarn deploy
# 或
pnpm deploy
```

## 🔑 Demo账号

- **用户名**: Admin
- **密码**: 5173rongcloud

## 📁 项目结构

```
src/
├── components/          # 公共组件
│   ├── Layout.tsx      # 主布局组件
│   ├── LanguageTabs.tsx # 语言切换组件
│   ├── ImageUpload.tsx # 图片上传组件
│   └── WhitelistModal.tsx # 白名单管理弹框
├── contexts/           # React Context
│   ├── AuthContext.tsx # 认证上下文
│   └── DataContext.tsx # 数据管理上下文
├── pages/              # 页面组件
│   ├── LoginPage.tsx   # 登录页
│   ├── CharacterList.tsx # 角色列表页
│   ├── CharacterForm.tsx # 角色表单页
│   ├── TemplateList.tsx # 模板列表页
│   ├── TemplateForm.tsx # 模板表单页
│   └── ConfigPage.tsx  # 配置页
├── types/              # TypeScript类型定义
│   └── index.ts
├── utils/              # 工具函数
│   ├── constants.ts    # 常量定义
│   └── mockData.ts     # 模拟数据生成器
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🎨 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI库**: Ant Design 5.x
- **路由**: React Router 6
- **图标**: Ant Design Icons
- **日期处理**: Day.js
- **状态管理**: React Context API
- **数据存储**: localStorage (模拟)
- **部署**: GitHub Pages

## 🔄 数据流说明

### 认证流程
1. 用户在登录页输入用户名和密码
2. AuthContext验证登录信息（模拟API调用）
3. 登录成功后保存用户信息和Token到localStorage
4. 用户状态在整个应用中共享

### 数据管理
1. 所有数据通过DataContext统一管理
2. 数据保存在localStorage中，模拟后端存储
3. 支持CRUD操作：创建、读取、更新、删除
4. 自动生成唯一ID和时间戳

### 多语言处理
1. 数据结构采用多语言对象格式：`{ zh: '', en: '', ar: '' }`
2. 表单提交时只更新当前选中语言的内容
3. 语言切换时动态更新表单显示内容

## 🚢 部署说明

### GitHub Pages自动部署
1. 推送代码到main分支
2. GitHub Actions自动触发构建
3. 构建完成后自动部署到gh-pages分支
4. 通过GitHub Pages访问应用

### 手动部署
1. 运行 `npm run build` 构建项目
2. 将dist目录内容上传到静态服务器
3. 配置服务器支持SPA路由（如Nginx的try_files）

## 📝 开发说明

### 模拟数据
- 项目使用模拟数据演示功能
- 数据保存在浏览器localStorage中
- 刷新页面数据不会丢失
- 可通过浏览器开发者工具清除数据

### 文件上传
- 使用URL.createObjectURL()模拟文件上传
- 实际项目中需要集成真实的云存储服务
- 支持的格式：JPG、PNG、GIF、WebP
- 文件大小限制：5MB

### API集成
- 当前版本为Demo，不包含真实API调用
- 所有异步操作都有模拟延迟
- 后续可替换为真实的HTTP请求

## 🛠️ 后续开发计划

1. **后端集成**: 集成真实的NestJS后端API
2. **数据库**: 连接MongoDB数据库
3. **文件存储**: 集成阿里云OSS或AWS S3
4. **用户权限**: 实现更完善的RBAC权限系统
5. **数据分析**: 添加角色使用统计和分析功能
6. **国际化**: 完善多语言支持，添加更多语言
7. **主题定制**: 支持深色模式和主题切换

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License

---

**注意**: 这是一个演示版本，仅用于展示功能和界面设计。生产环境使用请集成真实的后端服务和数据库。 