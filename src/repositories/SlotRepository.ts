import type { Slot } from '@/models/Slot'
import { BaseRepository } from './BaseRepository'

/**
 * Repository for managing slots in localStorage
 */
export class SlotRepository extends BaseRepository<Slot> {
  constructor() {
    super('slots')
  }

  /**
   * Find all slots for a specific service
   */
  findByServiceId(serviceId: string): Slot[] {
    return this.getAll().filter((slot) => slot.serviceId === serviceId)
  }

  /**
   * Find future slots for a service
   */
  findFutureSlotsByServiceId(serviceId: string): Slot[] {
    const now = new Date().toISOString()
    return this.getAll().filter(
      (slot) => slot.serviceId === serviceId && slot.datetime > now
    )
  }

  /**
   * Find all future slots
   */
  findFutureSlots(): Slot[] {
    const now = new Date().toISOString()
    return this.getAll().filter((slot) => slot.datetime > now)
  }

  /**
   * Delete all slots for a service
   */
  deleteByServiceId(serviceId: string): number {
    const items = this.getAll()
    const filteredItems = items.filter((slot) => slot.serviceId !== serviceId)
    const deletedCount = items.length - filteredItems.length
    this.saveAll(filteredItems)
    return deletedCount
  }
}

// Singleton instance
export const slotRepository = new SlotRepository()
