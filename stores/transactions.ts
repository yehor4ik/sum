import { defineStore } from 'pinia'
import { useMonobank } from '~/composables/useMonobank'

interface Transaction {
  id: string
  time: number
  description: string
  mcc: number
  amount: number
  balance: number
}

interface TransactionsState {
  transactions: Transaction[]
  loading: boolean
  error: string | null
}

export const useTransactionsStore = defineStore('transactions', {
  state: (): TransactionsState => ({
    transactions: [],
    loading: false,
    error: null,
  }),
  
  actions: {
    async fetchTransactions(accountId: string, fromDate: Date, toDate: Date) {
      this.loading = true
      this.error = null
      try {
        const { client } = useMonobank()
        const transactions = await client.value.getStatement(accountId, fromDate, toDate)
        this.transactions = transactions
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch transactions'
      } finally {
        this.loading = false
      }
    },
  },
  
  persist: true,
}) 