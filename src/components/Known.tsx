import { useState } from 'react'

const IS_LETTER = /[a-zA-Z]/

function validate(input: string): boolean {
  return input.length === 0 || IS_LETTER.test(input)
}

export function KnownLetters() {
  const [values, setValue] = useState('.....')
  const updateValue = (idx: number, letter: string) => {
    const letters = values.split('')
    letters[idx] = letter
    setValue(letters.join(''))
  }

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
              defaultValue=' '
              key={idx}
              onChange={(ev) => {
                if (validate(ev.target.value)) {
                  updateValue(idx, ev.target.value || ".")
                }
              }}
            />
          ))}
      </div>
    </section>
  )
}

export default KnownLetters
