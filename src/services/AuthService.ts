import type { User } from '@/models/User'
import { isAdminEmail } from '@/models/User'

/**
 * Service for handling authentication
 * Note: This is a simplified authentication system using only email (no password)
 */
export class AuthService {
  private readonly STORAGE_KEY = 'currentUser'

  /**
   * Authenticate a user with their email (simplified login)
   */
  login(email: string): User {
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format')
    }

    const user: User = {
      email: email.toLowerCase(),
      isAdmin: isAdminEmail(email),
      lastLogin: new Date().toISOString(),
    }

    this.saveCurrentUser(user)
    return user
  }

  /**
   * Log out the current user
   */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }

  /**
   * Get the currently logged-in user
   */
  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.STORAGE_KEY)
    return data ? JSON.parse(data) : null
  }

  /**
   * Check if a user is currently logged in
   */
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  /**
   * Check if the current user is an admin
   */
  isAdmin(): boolean {
    const user = this.getCurrentUser()
    return user?.isAdmin ?? false
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Save the current user to localStorage
   */
  private saveCurrentUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
  }
}

// Singleton instance
export const authService = new AuthService()
