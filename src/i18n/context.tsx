import { createContext, useContext, useMemo, useState } from 'react'

import enWords from '../words/en'
import esWords from '../words/es'

import enTranslations from './en'
import esTranslations from './es'

const EN = 'en'
const ES = 'es'
const DEFAULT_LANG = EN

const supportedLang = [EN, ES]

const TEXT: { [K in typeof supportedLang[number]]: Readonly<{ [key: string]: string }> } = {
  [EN]: enTranslations,
  [ES]: esTranslations,
}

const WORDS: { [K in typeof supportedLang[number]]: readonly string[] } = {
  [EN]: enWords,
  [ES]: esWords,
}

type I18nContextType = [
  (str: string) => string,
  React.Dispatch<React.SetStateAction<string>>,
  string,
  string[]
]

const I18nContext = createContext(null)

function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext)

  if (!ctx) throw new Error('useI18n needs to be used within a I18nProvider')
  return ctx
}

function I18nProvider(props: any) {
  const [browserLanguage] = navigator.language.split('-')

  const defaultLanguage = supportedLang.includes(browserLanguage)
    ? browserLanguage
    : DEFAULT_LANG

  const [lang, setLang] = useState(defaultLanguage)

  const value = useMemo(() => {
    const words = WORDS[lang]
    const getText = (str: string): string =>
      TEXT[lang][str] || TEXT[DEFAULT_LANG][str] || ''
    return [getText, setLang, lang, words]
  }, [lang])

  return <I18nContext.Provider value={value} {...props} />
}

export { I18nProvider, useI18n, supportedLang }
