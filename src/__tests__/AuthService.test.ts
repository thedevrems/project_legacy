import { describe, it, expect, beforeEach } from 'vitest'
import { AuthService } from '@/services/AuthService'
import type { CreateUserAccountDto } from '@/models/User'

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    authService = new AuthService()
  })

  describe('register', () => {
    it('should register a new user with valid data', () => {
      const userData: CreateUserAccountDto = {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '0612345678',
      }

      const userAccount = authService.register(userData)

      expect(userAccount.id).toBeDefined()
      expect(userAccount.email).toBe('john.doe@example.com')
      expect(userAccount.firstName).toBe('John')
      expect(userAccount.lastName).toBe('Doe')
      expect(userAccount.phone).toBe('0612345678')
      expect(userAccount.isAdmin).toBe(false)
      expect(userAccount.createdAt).toBeDefined()
    })

    it('should register admin user with admin email', () => {
      const userData: CreateUserAccountDto = {
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
      }

      const userAccount = authService.register(userData)

      expect(userAccount.isAdmin).toBe(true)
    })

    it('should throw error for invalid email', () => {
      const userData: CreateUserAccountDto = {
        email: 'invalid-email',
        firstName: 'John',
        lastName: 'Doe',
      }

      expect(() => authService.register(userData)).toThrow('Invalid email format')
    })

    it('should throw error for missing first name', () => {
      const userData: CreateUserAccountDto = {
        email: 'test@example.com',
        firstName: '',
        lastName: 'Doe',
      }

      expect(() => authService.register(userData)).toThrow('First name is required')
    })

    it('should throw error for missing last name', () => {
      const userData: CreateUserAccountDto = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: '',
      }

      expect(() => authService.register(userData)).toThrow('Last name is required')
    })

    it('should throw error for duplicate email', () => {
      const userData: CreateUserAccountDto = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      }

      authService.register(userData)

      expect(() => authService.register(userData)).toThrow(
        'This email is already registered'
      )
    })

    it('should throw error for invalid phone number', () => {
      const userData: CreateUserAccountDto = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: 'invalid',
      }

      expect(() => authService.register(userData)).toThrow('Invalid phone number format')
    })

    it('should normalize email to lowercase', () => {
      const userData: CreateUserAccountDto = {
        email: 'John.Doe@EXAMPLE.COM',
        firstName: 'John',
        lastName: 'Doe',
      }

      const userAccount = authService.register(userData)

      expect(userAccount.email).toBe('john.doe@example.com')
    })

    it('should trim firstName and lastName', () => {
      const userData: CreateUserAccountDto = {
        email: 'test@example.com',
        firstName: '  John  ',
        lastName: '  Doe  ',
      }

      const userAccount = authService.register(userData)

      expect(userAccount.firstName).toBe('John')
      expect(userAccount.lastName).toBe('Doe')
    })
  })

  describe('login', () => {
    it('should login a registered user with valid email', () => {
      // First register the user
      const userData: CreateUserAccountDto = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      }
      authService.register(userData)

      // Then login
      const user = authService.login('test@example.com')

      expect(user.email).toBe('test@example.com')
      expect(user.isAdmin).toBe(false)
      expect(user.lastLogin).toBeDefined()
    })

    it('should login an admin user', () => {
      // Register admin
      const userData: CreateUserAccountDto = {
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
      }
      authService.register(userData)

      // Login
      const user = authService.login('admin@example.com')

      expect(user.email).toBe('admin@example.com')
      expect(user.isAdmin).toBe(true)
    })

    it('should throw error for unregistered email', () => {
      expect(() => authService.login('unregistered@example.com')).toThrow(
        'No account found with this email. Please register first.'
      )
    })

    it('should throw error for invalid email', () => {
      expect(() => authService.login('invalid-email')).toThrow('Invalid email format')
    })

    it('should save user to localStorage', () => {
      // Register user
      const userData: CreateUserAccountDto = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      }
      authService.register(userData)

      // Login
      authService.login('test@example.com')

      const savedUser = localStorage.getItem('currentUser')
      expect(savedUser).toBeDefined()
      const parsedUser = JSON.parse(savedUser!)
      expect(parsedUser.email).toBe('test@example.com')
    })
  })

  describe('logout', () => {
    it('should remove user from localStorage', () => {
      // Register and login
      const userData: CreateUserAccountDto = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      }
      authService.register(userData)
      authService.login('test@example.com')

      // Logout
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

      // Register and login
      const userData: CreateUserAccountDto = {
        email,
        firstName: 'John',
        lastName: 'Doe',
      }
      authService.register(userData)
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
      // Register and login
      const userData: CreateUserAccountDto = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      }
      authService.register(userData)
      authService.login('test@example.com')

      expect(authService.isAuthenticated()).toBe(true)
    })
  })

  describe('isAdmin', () => {
    it('should return false for non-admin users', () => {
      // Register and login
      const userData: CreateUserAccountDto = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      }
      authService.register(userData)
      authService.login('test@example.com')

      expect(authService.isAdmin()).toBe(false)
    })

    it('should return true for admin users', () => {
      // Register and login admin
      const userData: CreateUserAccountDto = {
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
      }
      authService.register(userData)
      authService.login('admin@example.com')

      expect(authService.isAdmin()).toBe(true)
    })

    it('should return false when no user is logged in', () => {
      expect(authService.isAdmin()).toBe(false)
    })
  })
})
