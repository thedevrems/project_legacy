import type { User, UserAccount, CreateUserAccountDto } from '@/models/User'
import { isAdminEmail } from '@/models/User'
import { userRepository } from '@/repositories/UserRepository'
import { generateId } from '@/utils/idGenerator'

/**
 * Service for handling authentication and user registration
 * Note: This is a simplified authentication system using only email (no password)
 */
export class AuthService {
  private readonly STORAGE_KEY = 'currentUser'

  /**
   * Register a new user account
   */
  register(data: CreateUserAccountDto): UserAccount {
    // Validate email format
    if (!this.isValidEmail(data.email)) {
      throw new Error('Invalid email format')
    }

    // Validate required fields
    if (!data.firstName || data.firstName.trim() === '') {
      throw new Error('First name is required')
    }

    if (!data.lastName || data.lastName.trim() === '') {
      throw new Error('Last name is required')
    }

    // Check if email is already registered
    if (userRepository.emailExists(data.email)) {
      throw new Error('This email is already registered')
    }

    // Validate phone if provided
    if (data.phone && !this.isValidPhone(data.phone)) {
      throw new Error('Invalid phone number format')
    }

    // Create new user account
    const userAccount: UserAccount = {
      id: generateId('usr'),
      email: data.email.toLowerCase(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone?.trim(),
      isAdmin: isAdminEmail(data.email),
      createdAt: new Date().toISOString(),
    }

    return userRepository.create(userAccount)
  }

  /**
   * Authenticate a user with their email (simplified login)
   */
  login(email: string): User {
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format')
    }

    // Check if user account exists
    const userAccount = userRepository.findByEmail(email)
    if (!userAccount) {
      throw new Error('No account found with this email. Please register first.')
    }

    // Update last login
    userRepository.updateLastLogin(email)

    const user: User = {
      email: userAccount.email,
      isAdmin: userAccount.isAdmin,
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
   * Validate phone number format (basic validation)
   */
  private isValidPhone(phone: string): boolean {
    // Remove spaces, dashes, dots, and parentheses
    const cleanPhone = phone.replace(/[\s\-().]/g, '')
    // Check if it's 10 to 15 digits (international format)
    const phoneRegex = /^[\d+]{10,15}$/
    return phoneRegex.test(cleanPhone)
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
