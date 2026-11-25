import { useState } from 'react'
import type { Wallet } from './types'

function App() {
  const [token, setToken] = useState('')
  const [wallets, setWallets] = useState<Wallet[]>([])

  async function showWallets() {
    const response = await fetch('/api/wallets', {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data: Wallet[] = await response.json()
    setWallets(data)
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
    </>
  )
}

export default App