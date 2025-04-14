import axios, { AxiosError } from 'axios'

const BASE_URL = 'https://api.monobank.ua'

interface ClientInfo {
  name: string
  accounts: Array<{
    id: string
    balance: number
    currencyCode: number
    type: string
  }>
}

interface Transaction {
  id: string
  time: number
  description: string
  mcc: number
  amount: number
  balance: number
}

export class MonobankClient {
  private token: string

  constructor(token: string) {
    this.token = token
  }

  async getClientInfo(): Promise<ClientInfo> {
    try {
      const response = await axios.get<ClientInfo>(`${BASE_URL}/personal/client-info`, {
        headers: {
          'X-Token': this.token
        }
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.errorDescription || 'Failed to fetch client info')
      }
      throw error
    }
  }

  async getStatement(accountId: string, from: Date, to: Date): Promise<Transaction[]> {
    try {
      const response = await axios.get<Transaction[]>(
        `${BASE_URL}/personal/statement/${accountId}/${from.getTime()}/${to.getTime()}`,
        {
          headers: {
            'X-Token': this.token
          }
        }
      )
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.errorDescription || 'Failed to fetch statement')
      }
      throw error
    }
  }
} 