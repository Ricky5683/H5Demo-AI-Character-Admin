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

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // 初始化模拟数据
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('demo_characters')
    return saved ? JSON.parse(saved) : generateMockCharacters()
  })
  
  const [templates, setTemplates] = useState<Template[]>(() => {
    const saved = localStorage.getItem('demo_templates')
    return saved ? JSON.parse(saved) : generateMockTemplates()
  })
  
  const [config, setConfig] = useState<Config>(() => {
    const saved = localStorage.getItem('demo_config')
    return saved ? JSON.parse(saved) : generateMockConfig()
  })

  // 保存到localStorage的通用函数
  const saveToStorage = useCallback((key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
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
    updateCharacter(characterId, {
      whitelist: [...(characters.find(c => c.id === characterId)?.whitelist || []), phone]
    })
  }, [updateCharacter, characters])

  const removeFromWhitelist = useCallback((characterId: string, phone: string) => {
    const character = characters.find(c => c.id === characterId)
    if (character) {
      updateCharacter(characterId, {
        whitelist: character.whitelist.filter(p => p !== phone)
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