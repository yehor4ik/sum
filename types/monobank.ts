export interface ClientInfo {
  name: string
  accounts: Array<{
    id: string
    balance: number
    currencyCode: number
    type: string
    maskedPan?: string[]
  }>
}

export interface Statement {
  id: string
  time: number
  description: string
  mcc: number
  amount: number
  balance: number
  cashbackAmount?: number
} 