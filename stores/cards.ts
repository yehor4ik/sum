import { defineStore } from 'pinia'
import { useMonobank } from '~/composables/useMonobank'

interface Card {
  id: string
  balance: number
  currencyCode: number
  type: string
}

interface CardsState {
  cards: Card[]
  selectedCardId: string | null
}

export const useCardsStore = defineStore('cards', {
  state: (): CardsState => ({
    cards: [],
    selectedCardId: null,
  }),
  
  actions: {
    async fetchCards() {
      try {
        const { client } = useMonobank()
        const clientInfo = await client.value.getClientInfo()
        this.cards = clientInfo.accounts
      } catch (error) {
        console.error('Failed to fetch cards:', error)
      }
    },
    
    setSelectedCard(cardId: string) {
      this.selectedCardId = cardId
    },
  },
}) 