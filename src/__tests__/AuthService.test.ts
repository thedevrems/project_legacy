import { describe, it, expect, beforeEach } from 'vitest'
import { AuthService } from '@/services/AuthService'

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    authService = new AuthService()
  })

  describe('login', () => {
    it('should login a user with a valid email', () => {
      const email = 'test@example.com'
      const user = authService.login(email)

      expect(user.email).toBe(email)
      expect(user.isAdmin).toBe(false)
      expect(user.lastLogin).toBeDefined()
    })

    it('should login an admin user', () => {
      const email = 'admin@example.com'
      const user = authService.login(email)

      expect(user.email).toBe(email)
      expect(user.isAdmin).toBe(true)
    })

    it('should normalize email to lowercase', () => {
      const email = 'Test@Example.Com'
      const user = authService.login(email)

      expect(user.email).toBe('test@example.com')
    })

    it('should throw error for invalid email', () => {
      expect(() => authService.login('invalid-email')).toThrow('Invalid email format')
    })

    it('should save user to localStorage', () => {
      const email = 'test@example.com'
      authService.login(email)

      const savedUser = localStorage.getItem('currentUser')
      expect(savedUser).toBeDefined()
      const parsedUser = JSON.parse(savedUser!)
      expect(parsedUser.email).toBe(email)
    })
  })

  describe('logout', () => {
    it('should remove user from localStorage', () => {
      authService.login('test@example.com')
      authService.logout()

      const savedUser = localStorage.getItem('currentUser')
      expect(savedUser).toBeNull()
    })
  })

  describe('getCurrentUser', () => {
    it('should return null when no user is logged in', () => {
      const user = authService.getCurrentUser()
      expect(user).toBeNull()
    })

    it('should return current user when logged in', () => {
      const email = 'test@example.com'
      authService.login(email)

      const currentUser = authService.getCurrentUser()
      expect(currentUser).toBeDefined()
      expect(currentUser?.email).toBe(email)
    })
  })

  describe('isAuthenticated', () => {
    it('should return false when no user is logged in', () => {
      expect(authService.isAuthenticated()).toBe(false)
    })

    it('should return true when user is logged in', () => {
      authService.login('test@example.com')
      expect(authService.isAuthenticated()).toBe(true)
    })
  })

  describe('isAdmin', () => {
    it('should return false for non-admin users', () => {
      authService.login('test@example.com')
      expect(authService.isAdmin()).toBe(false)
    })

    it('should return true for admin users', () => {
      authService.login('admin@example.com')
      expect(authService.isAdmin()).toBe(true)
    })

    it('should return false when no user is logged in', () => {
      expect(authService.isAdmin()).toBe(false)
    })
  })
})
