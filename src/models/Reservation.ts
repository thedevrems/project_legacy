/**
 * Reservation model representing a user's booking
 */
export interface Reservation {
  id: string
  slotId: string
  userEmail: string
  createdAt: string
}

/**
 * Data required to create a new reservation
 */
export interface CreateReservationDto {
  slotId: string
  userEmail: string
}

/**
 * Extended reservation with related service and slot information
 */
export interface ReservationWithDetails extends Reservation {
  serviceName: string
  slotDatetime: string
  serviceDescription?: string
  serviceDuration?: number
}
