/**
 * User model for authentication
 */
export interface User {
  email: string
  isAdmin: boolean
  lastLogin: string
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
