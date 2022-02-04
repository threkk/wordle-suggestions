import KnownLetters from './components/Known'

export function App() {
  return (
    <main className='container'>
      <h1>Wordle Aid</h1>
      <blockquote>For those moments when you need additional inspiration</blockquote>
     <KnownLetters /> 
      <section>
        <h2>🟨 What you guess</h2>
        <input type="text" />
      </section>
      <section>
        <h2>⬛ What you discarded</h2>
        <input type="text" />
      </section>
    </main>
  )
}

export default App
