import { FixedSizeList as List } from 'react-window'
import { useI18n } from '../i18n/context'

const DEFAULT_NUMBER_OF_ITEMS = 15

interface SuggestionsProps {
  known: string
  guessed: string
  discarded: string
  numberOfItems?: number
}

function uniqueChars(word: string): string {
  return [...new Set(word.split(''))].join('')
}

export function Suggestions(props: SuggestionsProps) {
  const [getText, , , words] = useI18n()

  const { known, guessed, discarded, numberOfItems } = props
  const lineHeight = parseInt(
    getComputedStyle(document.body).lineHeight.slice(0, -2)
  )

  let filteredWords: string[] = []

  // Initial state, nothing known
  if (known === '.....' && guessed === '----' && discarded === '') {
    const waiting = getText('waiting')
    return (
      <section>
        <div aria-busy='true'>{waiting}</div>
      </section>
    )
  } else {
    const knownRe = new RegExp(known)
    const discardedRe = new RegExp(`[${discarded}]`)
    const discardedPerCellRe = new RegExp(
      guessed
        .split('-')
        .map((cell) => (cell.length > 0 ? `[^${uniqueChars(cell)}]` : '.'))
        .join('')
    )

    const allGuessedLetters = (word: string) => {
      // Remove the cell separator and split the characters
      const letters = guessed.replaceAll('-', '').split('')
      // Remove duplicates to sped up the reduce
      return [...new Set(letters)].reduce(
        (acc, letter) => acc && word.includes(letter),
        true
      )
    }

    filteredWords = words
      // We know these letters are in these positions.
      .filter((word) => knownRe.test(word))
      // We know ALL these letters are not in the word.
      .filter((word) => !discardedRe.test(word))
      // We know ALL these letters are part of the word.
      .filter((word) => (guessed !== '' ? allGuessedLetters(word) : true))
      // We know these letters are not in those concrete places.
      .filter((word) => discardedPerCellRe.test(word))
  }

  const suggested = getText('suggested')
  const notFound = getText('notFound')

  if (filteredWords.length === 0) {
    return (
      <section>
        <h2>{suggested}</h2>
        {notFound}
      </section>
    )
  }

  return (
    <section>
      <h2>{suggested}</h2>
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
