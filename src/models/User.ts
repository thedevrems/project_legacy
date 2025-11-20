/**
 * User model for authentication session
 */
export interface User {
  email: string
  isAdmin: boolean
  lastLogin: string
}

/**
 * User account with full profile information
 */
export interface UserAccount {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  isAdmin: boolean
  createdAt: string
  lastLogin?: string
}

/**
 * Data required to create a new user account
 */
export interface CreateUserAccountDto {
  email: string
  firstName: string
  lastName: string
  phone?: string
}

/**
 * Configuration for admin users
 */
export const ADMIN_EMAILS = ['admin@example.com', 'admin@booking.com']

/**
 * Check if an email belongs to an admin user
 */
export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase())
}
