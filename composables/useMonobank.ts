import { MonobankClient } from '~/utils/monobankClient'
import { useAuthStore } from '~/stores/auth'

export const useMonobank = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const client = computed(() => {
    if (!authStore.token) {
      throw new Error('No authentication token available')
    }
    return new MonobankClient(authStore.token)
  })

  return {
    client
  }
} 