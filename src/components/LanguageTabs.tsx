import React from 'react'
import { Tabs } from 'antd'
import { Language } from '@/types'
import { LANGUAGES } from '@/utils/constants'

interface LanguageTabsProps {
  activeLanguage: Language
  onChange: (language: Language) => void
  className?: string
}

const LanguageTabs: React.FC<LanguageTabsProps> = ({
  activeLanguage,
  onChange,
  className = 'language-tabs',
}) => {
  const tabItems = LANGUAGES.map(lang => ({
    key: lang.key,
    label: (
      <span>
        {lang.flag} {lang.label}
      </span>
    ),
  }))

  return (
    <Tabs
      activeKey={activeLanguage}
      onChange={(key) => onChange(key as Language)}
      items={tabItems}
      className={className}
      size="large"
      type="card"
    />
  )
}

export default LanguageTabs 