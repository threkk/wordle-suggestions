import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/context'
import DiscardedLetters from '../components/Discarded'
import GuessedLetters from '../components/Guessed'
import KnownLetters from '../components/Known'
import Suggestions from '../components/Suggestions'

const IS_LETTER = /[a-zA-Z]/

function isValidInput(input: string): boolean {
  return input.length === 0 || IS_LETTER.test(input)
}

export function App() {
  const [known, setKnown] = useState('.....')
  const [guess, setGuess] = useState('')
  const [discarded, setDiscarded] = useState('')
  const [getText, setLang, lang] = useI18n()

  useEffect(() => {
    const [userLang] = navigator.language.split('-')
    if (lang !== userLang) setLang(userLang)
  })

  function updateKnown(idx: number, letter: string): void {
    if (isValidInput(letter) && letter.length <= 1) {
      const letters = known.split('')
      letters[idx] = letter || '.'
      setKnown(letters.join(''))
    }
  }

  function updateGuess(letters: string): void {
    if (isValidInput(letters)) {
      setGuess(letters)
    }
  }

  function updateDiscarded(letters: string): void {
    if (isValidInput(letters)) {
      setDiscarded(letters)
    }
  }
  
  const subtitle = getText('subtitle')

  return (
    <>
      <header className='container'>
        <hgroup>
          <h1>Wordle Suggestions</h1>
          <h2>{subtitle}</h2>
        </hgroup>
      </header>
      <main className='container'>
        <KnownLetters handleKnownUpdate={updateKnown} />
        <GuessedLetters handleGuessedUpdate={updateGuess} />
        <DiscardedLetters handleDiscardedLetters={updateDiscarded} />
        <Suggestions known={known} guessed={guess} discarded={discarded} />
      </main>
      <footer className='container-fluid'>
        <small>
          Built by <a href='https://threkk.com/'>threkk</a>. Source code on{' '}
          <a href='https://github.com/threkk/wordle-suggestions'>Github</a>.
        </small>
      </footer>
    </>
  )
}

export default App
