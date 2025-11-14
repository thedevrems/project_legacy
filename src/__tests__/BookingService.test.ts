import { describe, it, expect, beforeEach } from 'vitest'
import { BookingService } from '@/services/BookingService'
import { slotRepository } from '@/repositories/SlotRepository'
import { reservationRepository } from '@/repositories/ReservationRepository'
import { serviceRepository } from '@/repositories/ServiceRepository'
import type { Slot } from '@/models/Slot'
import type { Service } from '@/models/Service'

describe('BookingService', () => {
  let bookingService: BookingService
  let testService: Service
  let testSlot: Slot

  beforeEach(() => {
    // Clear all repositories
    localStorage.clear()
    bookingService = new BookingService()

    // Create a test service
    testService = {
      id: 'svc_test_1',
      name: 'Test Service',
      description: 'A test service',
      duration: 30,
      createdAt: new Date().toISOString(),
    }
    serviceRepository.create(testService)

    // Create a test slot (2 hours in the future)
    const futureDate = new Date()
    futureDate.setHours(futureDate.getHours() + 2)

    testSlot = {
      id: 'slt_test_1',
      serviceId: testService.id,
      datetime: futureDate.toISOString(),
      capacity: 2,
      createdAt: new Date().toISOString(),
    }
    slotRepository.create(testSlot)
  })

  describe('createReservation', () => {
    it('should create a reservation successfully', () => {
      const userEmail = 'test@example.com'
      const reservation = bookingService.createReservation(testSlot.id, userEmail)

      expect(reservation).toBeDefined()
      expect(reservation.slotId).toBe(testSlot.id)
      expect(reservation.userEmail).toBe(userEmail)
    })

    it('should throw error when slot does not exist', () => {
      expect(() => bookingService.createReservation('invalid_slot', 'test@example.com')).toThrow(
        'Slot not found'
      )
    })

    it('should throw error for duplicate booking', () => {
      const userEmail = 'test@example.com'
      bookingService.createReservation(testSlot.id, userEmail)

      expect(() => bookingService.createReservation(testSlot.id, userEmail)).toThrow(
        'You have already booked this slot'
      )
    })

    it('should throw error when slot is fully booked', () => {
      // Fill the slot capacity
      bookingService.createReservation(testSlot.id, 'user1@example.com')
      bookingService.createReservation(testSlot.id, 'user2@example.com')

      // Try to book again
      expect(() => bookingService.createReservation(testSlot.id, 'user3@example.com')).toThrow(
        'This slot is fully booked'
      )
    })

    it('should throw error for past slots', () => {
      // Create a past slot
      const pastDate = new Date()
      pastDate.setHours(pastDate.getHours() - 2)

      const pastSlot: Slot = {
        id: 'slt_past_1',
        serviceId: testService.id,
        datetime: pastDate.toISOString(),
        capacity: 1,
        createdAt: new Date().toISOString(),
      }
      slotRepository.create(pastSlot)

      expect(() => bookingService.createReservation(pastSlot.id, 'test@example.com')).toThrow(
        'Cannot book a slot in the past'
      )
    })
  })

  describe('cancelReservation', () => {
    it('should cancel a reservation successfully', () => {
      const userEmail = 'test@example.com'
      const reservation = bookingService.createReservation(testSlot.id, userEmail)

      expect(() => bookingService.cancelReservation(reservation.id, userEmail)).not.toThrow()

      // Verify reservation is deleted
      const deletedReservation = reservationRepository.findById(reservation.id)
      expect(deletedReservation).toBeUndefined()
    })

    it('should throw error when reservation does not exist', () => {
      expect(() =>
        bookingService.cancelReservation('invalid_reservation', 'test@example.com')
      ).toThrow('Reservation not found')
    })

    it('should throw error when user tries to cancel another user\'s reservation', () => {
      const reservation = bookingService.createReservation(testSlot.id, 'user1@example.com')

      expect(() => bookingService.cancelReservation(reservation.id, 'user2@example.com')).toThrow(
        'You can only cancel your own reservations'
      )
    })

    it('should throw error when cancelling past reservations', () => {
      // Create a past slot
      const pastDate = new Date()
      pastDate.setHours(pastDate.getHours() - 2)

      const pastSlot: Slot = {
        id: 'slt_past_1',
        serviceId: testService.id,
        datetime: pastDate.toISOString(),
        capacity: 1,
        createdAt: new Date().toISOString(),
      }
      slotRepository.create(pastSlot)

      const userEmail = 'test@example.com'
      const reservation = reservationRepository.create({
        id: 'res_past_1',
        slotId: pastSlot.id,
        userEmail,
        createdAt: new Date().toISOString(),
      })

      expect(() => bookingService.cancelReservation(reservation.id, userEmail)).toThrow(
        'Cannot cancel a reservation for a past slot'
      )
    })
  })

  describe('getUserReservations', () => {
    it('should return all reservations for a user', () => {
      const userEmail = 'test@example.com'
      bookingService.createReservation(testSlot.id, userEmail)

      const reservations = bookingService.getUserReservations(userEmail)
      expect(reservations).toHaveLength(1)
      expect(reservations[0]?.userEmail).toBe(userEmail)
    })

    it('should return empty array when user has no reservations', () => {
      const reservations = bookingService.getUserReservations('test@example.com')
      expect(reservations).toHaveLength(0)
    })

    it('should not return other users\' reservations', () => {
      bookingService.createReservation(testSlot.id, 'user1@example.com')

      const reservations = bookingService.getUserReservations('user2@example.com')
      expect(reservations).toHaveLength(0)
    })
  })
})
