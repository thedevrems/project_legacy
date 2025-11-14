import type { Reservation } from '@/models/Reservation'
import { BaseRepository } from './BaseRepository'

/**
 * Repository for managing reservations in localStorage
 */
export class ReservationRepository extends BaseRepository<Reservation> {
  constructor() {
    super('reservations')
  }

  /**
   * Find all reservations for a specific user
   */
  findByUserEmail(userEmail: string): Reservation[] {
    return this.getAll().filter((reservation) => reservation.userEmail === userEmail)
  }

  /**
   * Find all reservations for a specific slot
   */
  findBySlotId(slotId: string): Reservation[] {
    return this.getAll().filter((reservation) => reservation.slotId === slotId)
  }

  /**
   * Check if a user has a reservation for a specific slot
   */
  existsByUserAndSlot(userEmail: string, slotId: string): boolean {
    return this.getAll().some(
      (reservation) => reservation.userEmail === userEmail && reservation.slotId === slotId
    )
  }

  /**
   * Count reservations for a specific slot
   */
  countBySlotId(slotId: string): number {
    return this.findBySlotId(slotId).length
  }

  /**
   * Delete all reservations for a slot
   */
  deleteBySlotId(slotId: string): number {
    const items = this.getAll()
    const filteredItems = items.filter((reservation) => reservation.slotId !== slotId)
    const deletedCount = items.length - filteredItems.length
    this.saveAll(filteredItems)
    return deletedCount
  }
}

// Singleton instance
export const reservationRepository = new ReservationRepository()
