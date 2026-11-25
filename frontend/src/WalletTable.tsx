import type { Wallet } from './types'

type WalletTableProps = {
  wallets: Wallet[]
}

function WalletTable({ wallets }: WalletTableProps) {
  return (
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
  )
}

export default WalletTable
