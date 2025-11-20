import type { UserAccount } from '@/models/User'
import { BaseRepository } from './BaseRepository'

/**
 * Repository for managing user accounts in localStorage
 */
export class UserRepository extends BaseRepository<UserAccount> {
  constructor() {
    super('userAccounts')
  }

  /**
   * Find a user account by email
   */
  findByEmail(email: string): UserAccount | undefined {
    return this.getAll().find((account) => account.email.toLowerCase() === email.toLowerCase())
  }

  /**
   * Check if an email is already registered
   */
  emailExists(email: string): boolean {
    return this.findByEmail(email) !== undefined
  }

  /**
   * Update last login timestamp
   */
  updateLastLogin(email: string): UserAccount | undefined {
    const account = this.findByEmail(email)
    if (!account) {
      return undefined
    }

    return this.update(account.id, {
      lastLogin: new Date().toISOString(),
    })
  }
}

// Singleton instance
export const userRepository = new UserRepository()
