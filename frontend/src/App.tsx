import { useState } from 'react'
import type { Wallet } from './types'
import WalletTable from './WalletTable'
import { getWallets } from './api'

function App() {
  const [token, setToken] = useState('')
  const [wallets, setWallets] = useState<Wallet[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function showWallets() {
    setError(null)
    setLoading(true)
    try {
      const data = await getWallets(token)
      setWallets(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Nieznany błąd')
      setWallets(null)
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
        <WalletTable wallets={wallets} />
      )}
    </>
  )
}

export default App
