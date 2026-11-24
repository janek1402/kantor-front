export type Currency = 'PLN' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF' | 'HUF' // wszystkie 7 walut

export type Wallet = {
  id: number
  currency: Currency
  balance: string
  reservedBalance: string
  isBlocked: boolean
  lastActivityAt: string | null
}