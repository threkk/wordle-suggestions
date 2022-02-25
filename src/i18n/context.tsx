import { createContext, useContext, useMemo, useState } from 'react'
import english from './en'
import spanish from './es'

const EN = 'en'
const ES = 'es'
const DEFAULT_LANG = EN

const CORPUS: { [key: string]: Readonly<{ [key: string]: string }> } = {
  [EN]: english,
  [ES]: spanish
}

type I18nContextType = [
  (str: string) => string,
  React.Dispatch<React.SetStateAction<string>>,
  string
]

const I18nContext = createContext(null)

function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext)

  if (!ctx) throw new Error('useI18n needs to be used within a I18nProvider')
  return ctx
}

function I18nProvider(props) {
  const [lang, setLang] = useState(DEFAULT_LANG)

  const value = useMemo(() => {
    const getText = (str: string): string =>
      CORPUS[lang][str] || CORPUS[DEFAULT_LANG][str] || ''
    return [getText, setLang, lang]
  }, [lang])

  return <I18nContext.Provider value={value} {...props} />
}

export { I18nProvider, useI18n }
