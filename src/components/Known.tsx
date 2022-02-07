interface KnownLetterProps {
  handleKnownUpdate: (idx: number, letter: string) => void
}

export function KnownLetters(props: KnownLetterProps) {
  return (
    <section>
      <h2>🟩 What you know</h2>
      <div className='grid'>
        {Array(5)
          .fill(null)
          .map((_, idx: number) => (
            <input
              type='text'
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
