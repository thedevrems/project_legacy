import { describe, it, expect, beforeEach } from 'vitest'
import { UserRepository } from '@/repositories/UserRepository'
import type { UserAccount } from '@/models/User'

describe('UserRepository', () => {
  let userRepository: UserRepository

  beforeEach(() => {
    localStorage.clear()
    userRepository = new UserRepository()
  })

  describe('findByEmail', () => {
    it('should find user by email', () => {
      const userAccount: UserAccount = {
        id: 'usr_1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        isAdmin: false,
        createdAt: new Date().toISOString(),
      }

      userRepository.create(userAccount)

      const found = userRepository.findByEmail('test@example.com')
      expect(found).toBeDefined()
      expect(found?.email).toBe('test@example.com')
    })

    it('should be case insensitive', () => {
      const userAccount: UserAccount = {
        id: 'usr_1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        isAdmin: false,
        createdAt: new Date().toISOString(),
      }

      userRepository.create(userAccount)

      const found = userRepository.findByEmail('TEST@EXAMPLE.COM')
      expect(found).toBeDefined()
      expect(found?.email).toBe('test@example.com')
    })

    it('should return undefined for non-existent email', () => {
      const found = userRepository.findByEmail('nonexistent@example.com')
      expect(found).toBeUndefined()
    })
  })

  describe('emailExists', () => {
    it('should return true if email exists', () => {
      const userAccount: UserAccount = {
        id: 'usr_1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        isAdmin: false,
        createdAt: new Date().toISOString(),
      }

      userRepository.create(userAccount)

      expect(userRepository.emailExists('test@example.com')).toBe(true)
    })

    it('should return false if email does not exist', () => {
      expect(userRepository.emailExists('nonexistent@example.com')).toBe(false)
    })
  })

  describe('updateLastLogin', () => {
    it('should update last login timestamp', () => {
      const userAccount: UserAccount = {
        id: 'usr_1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        isAdmin: false,
        createdAt: new Date().toISOString(),
      }

      userRepository.create(userAccount)

      const updated = userRepository.updateLastLogin('test@example.com')
      expect(updated).toBeDefined()
      expect(updated?.lastLogin).toBeDefined()
    })

    it('should return undefined for non-existent email', () => {
      const updated = userRepository.updateLastLogin('nonexistent@example.com')
      expect(updated).toBeUndefined()
    })
  })
})
