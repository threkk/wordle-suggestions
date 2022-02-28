import { useI18n } from "../i18n/context"

interface GuessedLetterProps {
  handleGuessedUpdate: (letter: string) => void
}

export function GuessedLetters(props: GuessedLetterProps) {
  const [getText] = useI18n()

  const title = getText('guessed')

  return (
    <section>
      <h2>🟨 {title}</h2>
      <input
        type='text'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck={false}
        name='guessed'
        defaultValue=''
        onChange={(ev) => props.handleGuessedUpdate(ev.target.value)}
      />
    </section>
  )
}

export default GuessedLetters
