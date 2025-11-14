import type { Reservation, ReservationWithDetails } from '@/models/Reservation'
import { reservationRepository } from '@/repositories/ReservationRepository'
import { slotRepository } from '@/repositories/SlotRepository'
import { serviceRepository } from '@/repositories/ServiceRepository'
import { generateId } from '@/utils/idGenerator'

/**
 * Service for handling bookings (business logic)
 */
export class BookingService {
  /**
   * Get all reservations for a user
   */
  getUserReservations(userEmail: string): Reservation[] {
    return reservationRepository.findByUserEmail(userEmail)
  }

  /**
   * Get reservations with full details (service name, slot datetime, etc.)
   */
  getUserReservationsWithDetails(userEmail: string): ReservationWithDetails[] {
    const reservations = this.getUserReservations(userEmail)

    const detailedReservations: ReservationWithDetails[] = []

    for (const reservation of reservations) {
      const slot = slotRepository.findById(reservation.slotId)
      if (!slot) continue

      const service = serviceRepository.findById(slot.serviceId)
      if (!service) continue

      detailedReservations.push({
        ...reservation,
        serviceName: service.name,
        slotDatetime: slot.datetime,
        serviceDescription: service.description,
        serviceDuration: service.duration,
      })
    }

    return detailedReservations.sort((a, b) => b.slotDatetime.localeCompare(a.slotDatetime))
  }

  /**
   * Get future reservations with details
   */
  getUserFutureReservations(userEmail: string): ReservationWithDetails[] {
    const now = new Date().toISOString()
    return this.getUserReservationsWithDetails(userEmail).filter(
      (reservation) => reservation.slotDatetime > now
    )
  }

  /**
   * Create a new reservation
   */
  createReservation(slotId: string, userEmail: string): Reservation {
    // Validate slot exists
    const slot = slotRepository.findById(slotId)
    if (!slot) {
      throw new Error('Slot not found')
    }

    // Check if slot is in the future
    if (new Date(slot.datetime) <= new Date()) {
      throw new Error('Cannot book a slot in the past')
    }

    // Check for duplicate booking (same user, same slot)
    if (reservationRepository.existsByUserAndSlot(userEmail, slotId)) {
      throw new Error('You have already booked this slot')
    }

    // Check slot capacity
    const reservationCount = reservationRepository.countBySlotId(slotId)
    if (reservationCount >= slot.capacity) {
      throw new Error('This slot is fully booked')
    }

    const reservation: Reservation = {
      id: generateId('res'),
      slotId,
      userEmail,
      createdAt: new Date().toISOString(),
    }

    return reservationRepository.create(reservation)
  }

  /**
   * Cancel a reservation
   */
  cancelReservation(reservationId: string, userEmail: string): void {
    const reservation = reservationRepository.findById(reservationId)

    if (!reservation) {
      throw new Error('Reservation not found')
    }

    // Verify the reservation belongs to the user
    if (reservation.userEmail !== userEmail) {
      throw new Error('You can only cancel your own reservations')
    }

    // Check if the slot is in the future
    const slot = slotRepository.findById(reservation.slotId)
    if (slot && new Date(slot.datetime) <= new Date()) {
      throw new Error('Cannot cancel a reservation for a past slot')
    }

    reservationRepository.delete(reservationId)
  }

  /**
   * Get reservation by ID
   */
  getReservationById(id: string): Reservation | undefined {
    return reservationRepository.findById(id)
  }
}

// Singleton instance
export const bookingService = new BookingService()
