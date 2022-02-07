import { words } from '../words'

interface SuggestionsProps {
  known: string
  guessed: string
  discarded: string
}

export function Suggestions(props: SuggestionsProps) {
  const { known, guessed, discarded } = props
  const filteredWords = words

  if (known === '.....' && guessed === '' && discarded === '') {
    return (
      <section>
        <div aria-busy='true'>Waiting for input...</div>
      </section>
    )
  }
  const cells = words.map((w, idx) => (
    <tr key={idx}>
      <td>{w}</td>
    </tr>
  ))

  return (
    <section>
      <table>
        <thead>
          <tr>
            <td>Suggested words</td>
          </tr>
        </thead>
        <tbody>{cells}</tbody>
      </table>
    </section>
  )
}

export default Suggestions
