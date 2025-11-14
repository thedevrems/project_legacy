import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Slot, CreateSlotDto } from '@/models/Slot'
import { slotManagementService } from '@/services/SlotManagementService'

/**
 * Slots store
 */
export const useSlotsStore = defineStore('slots', () => {
  const slots = ref<Slot[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Load slots for a specific service
   */
  function loadSlotsByService(serviceId: string) {
    loading.value = true
    error.value = null
    try {
      slots.value = slotManagementService.getSlotsByServiceId(serviceId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load slots'
    } finally {
      loading.value = false
    }
  }

  /**
   * Load future slots for a service
   */
  function loadFutureSlotsByService(serviceId: string) {
    loading.value = true
    error.value = null
    try {
      slots.value = slotManagementService.getFutureSlotsByServiceId(serviceId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load slots'
    } finally {
      loading.value = false
    }
  }

  /**
   * Get available capacity for a slot
   */
  function getAvailableCapacity(slotId: string): number {
    return slotManagementService.getAvailableCapacity(slotId)
  }

  /**
   * Check if a slot is available
   */
  function isSlotAvailable(slotId: string): boolean {
    return slotManagementService.isSlotAvailable(slotId)
  }

  /**
   * Create a new slot
   */
  function createSlot(data: CreateSlotDto) {
    try {
      const slot = slotManagementService.createSlot(data)
      slots.value.push(slot)
      return { success: true, slot }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create slot'
      return { success: false, error: message }
    }
  }

  /**
   * Delete a slot
   */
  function deleteSlot(id: string) {
    try {
      slotManagementService.deleteSlot(id)
      slots.value = slots.value.filter((s) => s.id !== id)
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete slot'
      return { success: false, error: message }
    }
  }

  return {
    slots,
    loading,
    error,
    loadSlotsByService,
    loadFutureSlotsByService,
    getAvailableCapacity,
    isSlotAvailable,
    createSlot,
    deleteSlot,
  }
})
