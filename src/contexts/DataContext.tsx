import React, { createContext, useContext, useState, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { Character, Template, Config } from '@/types'
import { generateMockCharacters, generateMockTemplates, generateMockConfig } from '@/utils/mockData'

interface DataContextType {
  // Characters
  characters: Character[]
  addCharacter: (character: Omit<Character, 'id' | 'botId' | 'createdAt' | 'updatedAt'>) => void
  updateCharacter: (id: string, character: Partial<Character>) => void
  deleteCharacter: (id: string) => void
  getCharacter: (id: string) => Character | undefined
  
  // Templates
  templates: Template[]
  addTemplate: (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTemplate: (id: string, template: Partial<Template>) => void
  deleteTemplate: (id: string) => void
  getTemplate: (id: string) => Template | undefined
  
  // Config
  config: Config
  updateConfig: (config: Partial<Config>) => void
  
  // Whitelist management
  addToWhitelist: (characterId: string, phone: string) => void
  removeFromWhitelist: (characterId: string, phone: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

interface DataProviderProps {
  children: React.ReactNode
}

// 安全的localStorage读取函数
function safeGetFromStorage<T>(key: string, defaultValue: T, validator?: (data: any) => boolean): T {
  try {
    const saved = localStorage.getItem(key)
    if (!saved) return defaultValue
    
    const parsed = JSON.parse(saved)
    
    // 如果提供了验证函数，使用它验证数据
    if (validator && !validator(parsed)) {
      console.warn('Invalid data format for key: ' + key + ', using default value')
      return defaultValue
    }
    
    return parsed
  } catch (error) {
    console.warn('Failed to parse localStorage data for key: ' + key, error)
    return defaultValue
  }
}

// 数据验证函数
const isValidCharactersArray = (data: any): boolean => {
  return Array.isArray(data) && data.every(item => 
    item && typeof item === 'object' && 
    typeof item.id === 'string' && 
    typeof item.botId === 'string'
  )
}

const isValidTemplatesArray = (data: any): boolean => {
  return Array.isArray(data) && data.every(item => 
    item && typeof item === 'object' && 
    typeof item.id === 'string' && 
    typeof item.name === 'object'
  )
}

const isValidConfig = (data: any): boolean => {
  return data && typeof data === 'object' && Array.isArray(data.defaultAvatars)
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // 一次性清理可能损坏的localStorage数据
  React.useEffect(() => {
    const cleanupVersion = '1.0.0'
    const currentVersion = localStorage.getItem('demo_data_version')
    
    if (currentVersion !== cleanupVersion) {
      // 清理可能损坏的数据
      localStorage.removeItem('demo_characters')
      localStorage.removeItem('demo_templates')
      localStorage.removeItem('demo_config')
      localStorage.setItem('demo_data_version', cleanupVersion)
      
      console.log('Data cleaned up for version:', cleanupVersion)
    }
  }, [])

  // 初始化模拟数据 - 添加类型验证
  const [characters, setCharacters] = useState<Character[]>(() => {
    return safeGetFromStorage(
      'demo_characters', 
      generateMockCharacters(), 
      isValidCharactersArray
    )
  })
  
  const [templates, setTemplates] = useState<Template[]>(() => {
    return safeGetFromStorage(
      'demo_templates', 
      generateMockTemplates(), 
      isValidTemplatesArray
    )
  })
  
  const [config, setConfig] = useState<Config>(() => {
    return safeGetFromStorage(
      'demo_config', 
      generateMockConfig(), 
      isValidConfig
    )
  })

  // 保存到localStorage的通用函数 - 添加错误处理
  const saveToStorage = useCallback((key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save data to localStorage for key: ' + key, error)
    }
  }, [])

  // Character operations
  const addCharacter = useCallback((characterData: Omit<Character, 'id' | 'botId' | 'createdAt' | 'updatedAt'>) => {
    const newCharacter: Character = {
      ...characterData,
      id: nanoid(),
      botId: `bot_${nanoid()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    setCharacters(prev => {
      const updated = [...prev, newCharacter]
      saveToStorage('demo_characters', updated)
      return updated
    })
  }, [saveToStorage])

  const updateCharacter = useCallback((id: string, updates: Partial<Character>) => {
    setCharacters(prev => {
      const updated = prev.map(char => 
        char.id === id 
          ? { ...char, ...updates, updatedAt: new Date().toISOString() }
          : char
      )
      saveToStorage('demo_characters', updated)
      return updated
    })
  }, [saveToStorage])

  const deleteCharacter = useCallback((id: string) => {
    setCharacters(prev => {
      const updated = prev.filter(char => char.id !== id)
      saveToStorage('demo_characters', updated)
      return updated
    })
  }, [saveToStorage])

  const getCharacter = useCallback((id: string) => {
    return characters.find(char => char.id === id)
  }, [characters])

  // Template operations
  const addTemplate = useCallback((templateData: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTemplate: Template = {
      ...templateData,
      id: nanoid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    setTemplates(prev => {
      const updated = [...prev, newTemplate]
      saveToStorage('demo_templates', updated)
      return updated
    })
  }, [saveToStorage])

  const updateTemplate = useCallback((id: string, updates: Partial<Template>) => {
    setTemplates(prev => {
      const updated = prev.map(template => 
        template.id === id 
          ? { ...template, ...updates, updatedAt: new Date().toISOString() }
          : template
      )
      saveToStorage('demo_templates', updated)
      return updated
    })
  }, [saveToStorage])

  const deleteTemplate = useCallback((id: string) => {
    setTemplates(prev => {
      const updated = prev.filter(template => template.id !== id)
      saveToStorage('demo_templates', updated)
      return updated
    })
  }, [saveToStorage])

  const getTemplate = useCallback((id: string) => {
    return templates.find(template => template.id === id)
  }, [templates])

  // Config operations
  const updateConfig = useCallback((updates: Partial<Config>) => {
    setConfig(prev => {
      const updated = { ...prev, ...updates }
      saveToStorage('demo_config', updated)
      return updated
    })
  }, [saveToStorage])

  // Whitelist operations
  const addToWhitelist = useCallback((characterId: string, phone: string) => {
    const character = characters.find(c => c.id === characterId)
    if (character) {
      updateCharacter(characterId, {
        whitelist: [...(character.whitelist || []), phone]
      })
    }
  }, [updateCharacter, characters])

  const removeFromWhitelist = useCallback((characterId: string, phone: string) => {
    const character = characters.find(c => c.id === characterId)
    if (character) {
      updateCharacter(characterId, {
        whitelist: (character.whitelist || []).filter(p => p !== phone)
      })
    }
  }, [updateCharacter, characters])

  const value = {
    characters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacter,
    templates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplate,
    config,
    updateConfig,
    addToWhitelist,
    removeFromWhitelist,
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
} 