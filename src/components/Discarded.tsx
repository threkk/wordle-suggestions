import { useI18n } from '../i18n/context'

interface DiscardedLetters {
  handleDiscardedLetters: (letter: string) => void
}

export function DiscardedLetters(props: DiscardedLetters) {
  const [getText] = useI18n()

  const title = getText('discarded')

  return (
    <section>
      <h2>⬛ {title}</h2>
      <input
        type='text'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck={false}
        name='discarded'
        defaultValue=''
        onChange={(ev) => props.handleDiscardedLetters(ev.target.value)}
      />
    </section>
  )
}

export default DiscardedLetters
