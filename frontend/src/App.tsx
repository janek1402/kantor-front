import { useState } from 'react'
import type { Wallet } from './types'

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body: { error?: string } = await response.json()
    return body.error ?? `Błąd ${response.status}`
  } catch {
    return `Błąd ${response.status}`
  }
}

function App() {
  const [token, setToken] = useState('')
  const [wallets, setWallets] = useState<Wallet[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function showWallets() {
    setError(null)
    setLoading(true)
    try {
      let response: Response
      try {
        response = await fetch('/api/wallets', {
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch {
        setError('Nie udało się połączyć z serwerem')
        setWallets(null)
        return
      }
      if (!response.ok) {
        setError(await readErrorMessage(response))
        setWallets(null)
        return
      }
      const data: Wallet[] = await response.json()
      setWallets(data)
    } finally {
      setLoading(false)
    }
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

      <button onClick={showWallets} disabled={loading}>
        {loading ? 'Ładowanie…' : 'Pokaż portfele'}
      </button>
      {error !== null && <p style={{ color: 'red' }}>{error}</p>}
      {wallets !== null && wallets.length === 0 && (
        <p>Nie masz jeszcze żadnych portfeli.</p>
      )}
      <p>Długość tokenu: {token.length}</p>
      {wallets !== null && wallets.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Waluta</th>
              <th>Saldo</th>
              <th>Zarezerwowane</th>
              <th>Zablokowany</th>
              <th>Ostatnia operacja</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet) => (
              <tr key={wallet.id}>
                <td>{wallet.currency}</td>
                <td>{wallet.balance}</td>
                <td>{wallet.reservedBalance}</td>
                <td>{wallet.isBlocked ? 'tak' : 'nie'}</td>
                <td>{wallet.lastActivityAt ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default App