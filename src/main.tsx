import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './pages/App'
import { I18nProvider } from './i18n/context'

ReactDOM.render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
