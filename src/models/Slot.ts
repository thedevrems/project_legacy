/**
 * Slot model representing an available time slot for a service
 */
export interface Slot {
  id: string
  serviceId: string
  datetime: string // ISO 8601 format
  capacity: number
  createdAt: string
}

/**
 * Data required to create a new slot
 */
export interface CreateSlotDto {
  serviceId: string
  datetime: string
  capacity: number
}
