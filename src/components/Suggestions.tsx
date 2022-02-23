import { words } from '../words'
import { FixedSizeList as List } from 'react-window'

const DEFAULT_NUMBER_OF_ITEMS = 15

interface SuggestionsProps {
  known: string
  guessed: string
  discarded: string
  numberOfItems?: number
}

export function Suggestions(props: SuggestionsProps) {
  const { known, guessed, discarded, numberOfItems } = props
  const lineHeight = parseInt(
    getComputedStyle(document.body).lineHeight.slice(0, -2)
  )
  let filteredWords: string[] = []

  if (known === '.....' && guessed === '' && discarded === '') {
    return (
      <section>
        <div aria-busy='true'>Waiting for input...</div>
      </section>
    )
  } else {
    const knownRe = new RegExp(known)
    const discardedRe = new RegExp(`[${discarded}]`)

    const guessedTest = (word: string) =>
      guessed
        .split('')
        .reduce((acc, letter) => acc && word.includes(letter), true)

    filteredWords = words
      .filter((word) => knownRe.test(word))
      .filter((word) => !discardedRe.test(word))
      .filter((word) => (guessed !== '' ? guessedTest(word) : true))
  }

  if (filteredWords.length === 0) {
    return (
      <section>
        <h2>Suggested words</h2>
        No words found matching your criteria.
      </section>
    )
  }

  return (
    <section>
      <h2>Suggested words</h2>
      <List
        height={(numberOfItems ?? DEFAULT_NUMBER_OF_ITEMS) * lineHeight}
        width={'100%'}
        itemSize={lineHeight}
        itemCount={filteredWords.length}
        innerElementType='ul'
        style={{ overflowX: 'hidden' }}
      >
        {({ index, style }) => (
          <li style={{ ...style, marginLeft: '20px' }}>
            {filteredWords[index]}
          </li>
        )}
      </List>
    </section>
  )
}

export default Suggestions
