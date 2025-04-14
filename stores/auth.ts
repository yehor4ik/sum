import { defineStore } from 'pinia'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: process.env.NUXT_PUBLIC_BANK_AUTH_TOKEN || null,
    isAuthenticated: false,
  }),
  
  actions: {
    setToken(newToken: string) {
      this.token = newToken
      this.isAuthenticated = true
    },
    
    clearToken() {
      this.token = null
      this.isAuthenticated = false
    },
  },
}) 