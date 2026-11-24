import { useState } from 'react'

function App() {
  const [token, setToken] = useState('')

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
      <p>Długość tokenu: {token.length}</p>
    </>
  )
}

export default App