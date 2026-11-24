import { useState } from 'react'

function App() {
  const [token, setToken] = useState('')
  const [result, setResult] = useState('')

  async function showWallets() {
    const response = await fetch('/api/wallets', {
      headers: { Authorization: `Bearer ${token}` },
    })
    const text = await response.text()
    setResult(text)
  }

  return (
    <>
      <h1>Kantor – moje portfele</h1>
      <label>
        Token:{' '}
        <input
          type="password"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
      </label>

      <button onClick={showWallets}>Pokaż portfele</button>
      <p>Długość tokenu: {token.length}</p>
      <pre>Wynik: {result}</pre>
    </>
  )
}

export default App