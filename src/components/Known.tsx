import { useI18n } from "../i18n/context"

interface KnownLetterProps {
  handleKnownUpdate: (idx: number, letter: string) => void
}

export function KnownLetters(props: KnownLetterProps) {
  const [getText] = useI18n()

  const title = getText('known')

  return (
    <section>
      <h2>🟩 {title}</h2>
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
              maxLength={1}
              name={`known-${idx}`}
              defaultValue=''
              key={idx}
              onChange={(ev) => props.handleKnownUpdate(idx, ev.target.value)}
            />
          ))}
      </div>
    </section>
  )
}

export default KnownLetters
