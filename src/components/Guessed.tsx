import { useI18n } from '../i18n/context'

interface GuessedLetterProps {
  handleGuessedUpdate: (idx: number, letter: string) => void
}

export function GuessedLetters(props: GuessedLetterProps) {
  const [getText] = useI18n()

  const title = getText('guessed')

  return (
    <section>
      <h2>🟨 {title}</h2>
      <div className='grid'>
        {Array(5)
          .fill(null)
          .map((_, idx: number) => (
            <input
              type='text'
              autoComplete='off'
              autoCorrect='off'
              autoCapitalize='off'
              spellCheck={false}
              name='guessed'
              defaultValue=''
              key={idx}
              onChange={(ev) => props.handleGuessedUpdate(idx, ev.target.value)}
            />
          ))}
      </div>
    </section>
  )
}

export default GuessedLetters
