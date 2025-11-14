import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/models/User'
import { authService } from '@/services/AuthService'

/**
 * Authentication store
 */
export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)

  // Computed properties
  const isAuthenticated = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.isAdmin ?? false)
  const userEmail = computed(() => currentUser.value?.email ?? '')

  /**
   * Initialize the store by loading the current user
   */
  function initialize() {
    currentUser.value = authService.getCurrentUser()
  }

  /**
   * Login with email
   */
  function login(email: string) {
    try {
      const user = authService.login(email)
      currentUser.value = user
      return { success: true, user }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }
    }
  }

  /**
   * Logout the current user
   */
  function logout() {
    authService.logout()
    currentUser.value = null
  }

  return {
    currentUser,
    isAuthenticated,
    isAdmin,
    userEmail,
    initialize,
    login,
    logout,
  }
})
