# 🚀 GitHub Pages 部署指南

本指南将帮助您将 H5 Demo AI角色管理后台系统部署到GitHub Pages。

## 📋 前提条件

- ✅ 拥有GitHub账号
- ✅ 本地已安装Git
- ✅ 项目已初始化为git仓库（已完成）

## 🗂️ 第一步：创建GitHub仓库

1. **登录GitHub**
   - 访问 [GitHub](https://github.com)
   - 登录您的账号

2. **创建新仓库**
   - 点击右上角的 "+" 号
   - 选择 "New repository"

3. **仓库设置**
   - **仓库名称**: `H5Demo-AI-Character-Admin`
   - **描述**: `H5 Demo AI角色管理后台系统 - React + TypeScript + Ant Design`
   - **可见性**: 选择 `Public`（GitHub Pages免费版需要公开仓库）
   - **不要勾选** "Add a README file"、"Add .gitignore"、"Choose a license"（我们已经有了）

4. **创建仓库**
   - 点击 "Create repository"

## 🔗 第二步：连接本地仓库到GitHub

创建GitHub仓库后，您会看到一个页面显示如何推送现有仓库。请在终端中执行以下命令：

```bash
# 添加远程仓库（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/H5Demo-AI-Character-Admin.git

# 设置默认分支名为main
git branch -M main

# 推送代码到GitHub
git push -u origin main
```

**注意**: 请将 `YOUR_USERNAME` 替换为您的GitHub用户名！

## ⚙️ 第三步：配置GitHub Pages

1. **进入仓库设置**
   - 在GitHub仓库页面，点击 "Settings" 标签

2. **找到Pages设置**
   - 在左侧菜单中找到并点击 "Pages"

3. **配置部署源**
   - **Source**: 选择 "GitHub Actions"
   - 这将使用我们已经配置好的 `.github/workflows/deploy.yml` 文件

4. **保存设置**
   - 设置会自动保存

## 🚀 第四步：自动部署

一旦您推送代码到main分支：

1. **GitHub Actions自动触发**
   - 查看 "Actions" 标签页可以看到构建过程

2. **等待部署完成**
   - 通常需要2-5分钟
   - 绿色✅表示成功，红色❌表示失败

3. **访问您的网站**
   - 部署成功后，访问: `https://your-username.github.io/H5Demo-AI-Character-Admin/`
   - 替换 `your-username` 为您的GitHub用户名

## 🔧 第五步：测试部署

1. **访问网站**
   - 点击部署后的链接
   - 应该能看到登录页面

2. **测试登录**
   - 用户名: `Admin`
   - 密码: `5173rongcloud`

3. **验证功能**
   - 测试角色管理
   - 测试多语言切换
   - 测试文件上传
   - 测试各个菜单功能

## 🔄 更新部署

以后每次更新代码时：

```bash
# 添加修改的文件
git add .

# 提交更改
git commit -m "描述您的更改"

# 推送到GitHub
git push origin main
```

推送后，GitHub Actions会自动重新构建和部署。

## 🚨 常见问题

### Q: 部署后页面显示404
**A**: 检查以下几点：
- GitHub Pages是否已启用
- 仓库是否为Public
- 等待几分钟让DNS生效

### Q: 页面能打开但是路由不工作
**A**: 这是SPA路由问题：
- GitHub Pages已配置支持SPA路由
- 如果仍有问题，检查base路径设置

### Q: GitHub Actions构建失败
**A**: 查看Actions日志：
- 点击失败的构建查看详细错误
- 通常是依赖安装或构建命令问题

### Q: 如何自定义域名？
**A**: 在GitHub Pages设置中：
- 添加您的自定义域名
- 配置CNAME记录指向 `your-username.github.io`

## 📝 完整命令参考

以下是完整的部署命令（请替换YOUR_USERNAME）：

```bash
# 1. 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/H5Demo-AI-Character-Admin.git

# 2. 设置分支
git branch -M main

# 3. 推送代码
git push -u origin main

# 4. 等待自动部署完成，然后访问：
# https://YOUR_USERNAME.github.io/H5Demo-AI-Character-Admin/
```

## 🎉 完成！

恭喜！您的H5 Demo AI角色管理后台系统现在已经成功部署到GitHub Pages上了。

**您的网站地址**: `https://your-username.github.io/H5Demo-AI-Character-Admin/`

享受您的在线演示系统吧！ 🚀 