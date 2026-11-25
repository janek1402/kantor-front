import type { Wallet } from './types'

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body: { error?: string } = await response.json()
    return body.error ?? `Błąd ${response.status}`
  } catch {
    return `Błąd ${response.status}`
  }
}

export async function getWallets(token: string): Promise<Wallet[]> {
  let response: Response
  try {
    response = await fetch('/api/wallets', {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch {
    throw new Error('Nie udało się połączyć z serwerem')
  }
  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }
  return await response.json()
}