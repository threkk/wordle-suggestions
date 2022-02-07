interface DiscardedLetters {
  handleDiscardedLetters: (letter: string) => void
}

export function DiscardedLetters(props: DiscardedLetters) {
  return (
    <section>
      <h2>⬛ What you discarded</h2>
      <input
        type='text'
        name='discarded'
        defaultValue=''
        onChange={(ev) => props.handleDiscardedLetters(ev.target.value)}
      />
    </section>
  )
}

export default DiscardedLetters
