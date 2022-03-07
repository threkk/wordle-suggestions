import { useState } from 'react'
import { supportedLang, useI18n } from '../i18n/context'
import DiscardedLetters from '../components/Discarded'
import GuessedLetters from '../components/Guessed'
import KnownLetters from '../components/Known'
import Suggestions from '../components/Suggestions'

const IS_NOT_LETTER = /[^a-zA-Z]/

function isValidInput(input: string): boolean {
  return input.length === 0 || !IS_NOT_LETTER.test(input)
}

function normalise(str: string): string {
  return str.toLowerCase().trim().replaceAll(/\W/g, '')
}

export function App() {
  const [known, setKnown] = useState('.....')
  const [guess, setGuess] = useState('----')
  const [discarded, setDiscarded] = useState('')
  const [getText, setLang, lang] = useI18n()

  function updateKnown(idx: number, letter: string): void {
    if (isValidInput(letter) && letter.length <= 1) {
      const letters = known.split('')
      letters[idx] = normalise(letter) || '.'
      setKnown(letters.join(''))
    }
  }

  function updateGuess(idx: number, letters: string): void {
    if (isValidInput(letters)) {
      const fields = guess.split('-')
      fields[idx] = normalise(letters)
      setGuess(fields.join('-'))
    }
  }

  function updateDiscarded(letters: string): void {
    if (isValidInput(letters)) {
      setDiscarded(normalise(letters))
    }
  }

  function handleLang(evt: React.ChangeEvent<HTMLSelectElement>): void {
    const value = evt.target.value
    if (supportedLang.includes(value)) {
      setLang(value)
    }
  }

  const title = getText('title')
  const subtitle = getText('subtitle')
  const createdBy = getText('createdBy')
  const sourceCode = getText('sourceCode')

  // Normally we would need to debounce the inputs but we don't need it because:
  // a) We don't make remote queries.
  // b) We are pretty much ok with overwritting the existing content.
  //
  // We might still want to debounce for avoiding re-renders
  return (
    <>
      <header className='container'>
        <hgroup>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </hgroup>
        <select value={lang} onChange={handleLang} style={{ width: 'auto' }}>
          <option value='en'>🇬🇧</option>
          <option value='es'>🇪🇸</option>
        </select>
      </header>
      <main className='container'>
        <KnownLetters handleKnownUpdate={updateKnown} />
        <GuessedLetters handleGuessedUpdate={updateGuess} />
        <DiscardedLetters handleDiscardedLetters={updateDiscarded} />
        <Suggestions known={known} guessed={guess} discarded={discarded} />
      </main>
      <footer className='container-fluid'>
        <small>
          {createdBy} <a href='https://threkk.com/'>threkk</a>. {sourceCode}{' '}
          <a href='https://github.com/threkk/wordle-suggestions'>Github</a>.
        </small>
      </footer>
    </>
  )
}

export default App
