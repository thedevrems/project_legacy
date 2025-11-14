import type { Slot, CreateSlotDto } from '@/models/Slot'
import { slotRepository } from '@/repositories/SlotRepository'
import { serviceRepository } from '@/repositories/ServiceRepository'
import { reservationRepository } from '@/repositories/ReservationRepository'
import { generateId } from '@/utils/idGenerator'

/**
 * Service for managing slots (business logic)
 */
export class SlotManagementService {
  /**
   * Get all slots for a service
   */
  getSlotsByServiceId(serviceId: string): Slot[] {
    return slotRepository.findByServiceId(serviceId)
  }

  /**
   * Get all future slots for a service
   */
  getFutureSlotsByServiceId(serviceId: string): Slot[] {
    return slotRepository.findFutureSlotsByServiceId(serviceId)
  }

  /**
   * Get all future slots
   */
  getAllFutureSlots(): Slot[] {
    return slotRepository.findFutureSlots()
  }

  /**
   * Get a slot by ID
   */
  getSlotById(id: string): Slot | undefined {
    return slotRepository.findById(id)
  }

  /**
   * Get available capacity for a slot
   */
  getAvailableCapacity(slotId: string): number {
    const slot = slotRepository.findById(slotId)
    if (!slot) {
      return 0
    }

    const reservationCount = reservationRepository.countBySlotId(slotId)
    return Math.max(0, slot.capacity - reservationCount)
  }

  /**
   * Check if a slot is available for booking
   */
  isSlotAvailable(slotId: string): boolean {
    return this.getAvailableCapacity(slotId) > 0
  }

  /**
   * Create a new slot
   */
  createSlot(data: CreateSlotDto): Slot {
    // Validate service exists
    const service = serviceRepository.findById(data.serviceId)
    if (!service) {
      throw new Error('Service not found')
    }

    // Validate datetime format and future date
    const slotDate = new Date(data.datetime)
    if (isNaN(slotDate.getTime())) {
      throw new Error('Invalid datetime format')
    }

    if (slotDate <= new Date()) {
      throw new Error('Slot datetime must be in the future')
    }

    // Validate capacity
    if (!Number.isInteger(data.capacity) || data.capacity <= 0) {
      throw new Error('Capacity must be a positive integer')
    }

    const slot: Slot = {
      id: generateId('slt'),
      serviceId: data.serviceId,
      datetime: data.datetime,
      capacity: data.capacity,
      createdAt: new Date().toISOString(),
    }

    return slotRepository.create(slot)
  }

  /**
   * Update an existing slot
   */
  updateSlot(id: string, data: Partial<CreateSlotDto>): Slot {
    const existing = slotRepository.findById(id)
    if (!existing) {
      throw new Error('Slot not found')
    }

    // Validate datetime if provided
    if (data.datetime !== undefined) {
      const slotDate = new Date(data.datetime)
      if (isNaN(slotDate.getTime())) {
        throw new Error('Invalid datetime format')
      }

      if (slotDate <= new Date()) {
        throw new Error('Slot datetime must be in the future')
      }
    }

    // Validate capacity if provided
    if (data.capacity !== undefined) {
      if (!Number.isInteger(data.capacity) || data.capacity <= 0) {
        throw new Error('Capacity must be a positive integer')
      }

      // Check if reducing capacity would conflict with existing reservations
      const reservationCount = reservationRepository.countBySlotId(id)
      if (data.capacity < reservationCount) {
        throw new Error(
          `Cannot reduce capacity below ${reservationCount} (current number of reservations)`
        )
      }
    }

    const updated = slotRepository.update(id, data)
    if (!updated) {
      throw new Error('Failed to update slot')
    }

    return updated
  }

  /**
   * Delete a slot and all its reservations
   */
  deleteSlot(id: string): void {
    const slot = slotRepository.findById(id)
    if (!slot) {
      throw new Error('Slot not found')
    }

    // Delete all reservations for this slot
    reservationRepository.deleteBySlotId(id)

    // Delete the slot
    slotRepository.delete(id)
  }
}

// Singleton instance
export const slotManagementService = new SlotManagementService()
