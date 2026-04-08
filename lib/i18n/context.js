'use client'
import { createContext, useContext, useState, useCallback } from 'react'
import { translations, defaultLocale } from './translations'

const I18nContext = createContext({})

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window === 'undefined') return defaultLocale
    return localStorage.getItem('aca_locale') || defaultLocale
  })

  const switchLocale = useCallback((newLocale) => {
    setLocale(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('aca_locale', newLocale)
    }
  }, [])

  const t = useCallback((key, params = {}) => {
    let text = translations[locale]?.[key] || translations[defaultLocale]?.[key] || key
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v)
    })
    return text
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale: switchLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
