import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { message } from 'antd'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import CharacterList from './pages/CharacterList'
import CharacterForm from './pages/CharacterForm'
import TemplateList from './pages/TemplateList'
import TemplateForm from './pages/TemplateForm'
import ConfigPage from './pages/ConfigPage'
import TestPage from './pages/TestPage'
import SimpleCharacterList from './pages/SimpleCharacterList'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'

// Configure message globally
message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
})

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return (
    <Layout>
      {children}
    </Layout>
  )
}

// Public Route component (redirect to dashboard if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/simple" replace />
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          {/* 登录页面 */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          
          {/* 首页重定向 */}
          <Route
            path="/"
            element={<Navigate to="/simple" replace />}
          />
          
          {/* 测试页面 */}
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />
          
          {/* 简化版角色管理 */}
          <Route
            path="/simple"
            element={
              <ProtectedRoute>
                <SimpleCharacterList />
              </ProtectedRoute>
            }
          />
          
          {/* 角色管理（完整版） */}
          <Route
            path="/characters"
            element={
              <ProtectedRoute>
                <CharacterList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/characters/new"
            element={
              <ProtectedRoute>
                <CharacterForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/characters/edit/:id"
            element={
              <ProtectedRoute>
                <CharacterForm />
              </ProtectedRoute>
            }
          />
          
          {/* 模板管理 */}
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <TemplateList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates/new"
            element={
              <ProtectedRoute>
                <TemplateForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates/edit/:id"
            element={
              <ProtectedRoute>
                <TemplateForm />
              </ProtectedRoute>
            }
          />
          
          {/* 通用配置 */}
          <Route
            path="/config"
            element={
              <ProtectedRoute>
                <ConfigPage />
              </ProtectedRoute>
            }
          />
          
          {/* 404处理 */}
          <Route path="*" element={<Navigate to="/simple" replace />} />
        </Routes>
      </DataProvider>
    </AuthProvider>
  )
}

export default App 