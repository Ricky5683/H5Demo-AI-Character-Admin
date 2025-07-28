import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // 从localStorage恢复登录状态
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user')
    const savedToken = localStorage.getItem('auth_token')
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Failed to parse saved user data:', error)
        localStorage.removeItem('auth_user')
        localStorage.removeItem('auth_token')
      }
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟登录验证
    // 在实际项目中，这里会调用真实的API
    if (username === 'Admin' && password === '5173rongcloud') {
      const userData: User = {
        id: '1',
        username: 'Admin'
      }
      
      const mockToken = 'mock_jwt_token_' + Date.now()
      
      // 保存到localStorage
      localStorage.setItem('auth_user', JSON.stringify(userData))
      localStorage.setItem('auth_token', mockToken)
      
      setUser(userData)
      setIsAuthenticated(true)
      return true
    }
    
    return false
  }

  const logout = () => {
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 