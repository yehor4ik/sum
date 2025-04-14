import { ref, computed } from 'vue'

const token = ref<string | null>(null)
const isAuthenticated = computed(() => !!token.value)

export function useAuth() {
  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const clearToken = () => {
    token.value = null
  }

  return {
    token,
    isAuthenticated,
    setToken,
    clearToken
  }
} 