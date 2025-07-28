import React, { useState } from 'react'
import { Layout as AntLayout, Menu, Button, Dropdown, Avatar } from 'antd'
import {
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { MENU_ITEMS } from '@/utils/constants'

const { Header, Sider, Content } = AntLayout

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  // 根据当前路径获取选中的菜单项
  const getSelectedKey = () => {
    const path = location.pathname
    if (path.startsWith('/characters')) return 'characters'
    if (path.startsWith('/templates')) return 'templates'
    if (path.startsWith('/config')) return 'config'
    return 'characters'
  }

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    const menuItem = MENU_ITEMS.find(item => item.key === key)
    if (menuItem) {
      navigate(menuItem.path)
    }
  }

  // 处理退出登录
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // 用户下拉菜单
  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  // 菜单项配置
  const menuItems = [
    {
      key: 'characters',
      icon: <UserOutlined />,
      label: 'AI角色管理',
    },
    {
      key: 'templates',
      icon: <FileTextOutlined />,
      label: '模板管理',
    },
    {
      key: 'config',
      icon: <SettingOutlined />,
      label: '通用配置',
    },
  ]

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            borderBottom: '1px solid #404040',
          }}
        >
          {collapsed ? 'AI' : 'AI角色管理后台'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
        />
      </Sider>
      
      <AntLayout>
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>欢迎，{user?.username}</span>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Avatar
                style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>
        </Header>
        
        <Content
          style={{
            margin: '24px',
            padding: '24px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout 