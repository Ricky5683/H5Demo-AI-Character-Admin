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
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

// Public Route component (redirect to dashboard if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/characters" replace />
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route index element={<Navigate to="characters" replace />} />
                    <Route path="characters" element={<CharacterList />} />
                    <Route path="characters/new" element={<CharacterForm />} />
                    <Route path="characters/edit/:id" element={<CharacterForm />} />
                    <Route path="templates" element={<TemplateList />} />
                    <Route path="templates/new" element={<TemplateForm />} />
                    <Route path="templates/edit/:id" element={<TemplateForm />} />
                    <Route path="config" element={<ConfigPage />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/characters" replace />} />
        </Routes>
      </DataProvider>
    </AuthProvider>
  )
}

export default App 