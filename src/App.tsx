import { useState } from 'react'
import { DiscardedLetters } from './components/Discarded'
import GuessedLetters from './components/Guessed'
import KnownLetters from './components/Known'
import Suggestions from './components/Suggestions'

const IS_LETTER = /[a-zA-Z]/

function isValidInput(input: string): boolean {
  return input.length === 0 || IS_LETTER.test(input)
}

export function App() {
  const [known, setKnown] = useState('.....')
  const [guess, setGuess] = useState('')
  const [discarded, setDiscarded] = useState('')

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

  return (
    <>
      <header className='container'>
        <hgroup>
          <h1>Wordle Aid</h1>
          <h2>For those moments when you need extra inspiration</h2>
        </hgroup>
      </header>
      <main className='container'>
        <KnownLetters handleKnownUpdate={updateKnown} />
        <GuessedLetters handleGuessedUpdate={updateGuess} />
        <DiscardedLetters handleDiscardedLetters={updateDiscarded} />
        <Suggestions known={known} guessed={guess} discarded={discarded} />
      </main>
    </>
  )
}

export default App
