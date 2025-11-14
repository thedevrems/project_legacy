import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ReservationWithDetails } from '@/models/Reservation'
import { bookingService } from '@/services/BookingService'
import { useAuthStore } from './auth'

/**
 * Bookings store
 */
export const useBookingsStore = defineStore('bookings', () => {
  const reservations = ref<ReservationWithDetails[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Load reservations for the current user
   */
  function loadUserReservations() {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      reservations.value = []
      return
    }

    loading.value = true
    error.value = null
    try {
      reservations.value = bookingService.getUserReservationsWithDetails(authStore.userEmail)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load reservations'
    } finally {
      loading.value = false
    }
  }

  /**
   * Load future reservations for the current user
   */
  function loadFutureReservations() {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      reservations.value = []
      return
    }

    loading.value = true
    error.value = null
    try {
      reservations.value = bookingService.getUserFutureReservations(authStore.userEmail)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load reservations'
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new reservation
   */
  function createReservation(slotId: string) {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      return { success: false, error: 'You must be logged in to book a slot' }
    }

    try {
      const reservation = bookingService.createReservation(slotId, authStore.userEmail)
      // Reload reservations to get updated list with details
      loadUserReservations()
      return { success: true, reservation }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create reservation'
      return { success: false, error: message }
    }
  }

  /**
   * Cancel a reservation
   */
  function cancelReservation(reservationId: string) {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      return { success: false, error: 'You must be logged in to cancel a reservation' }
    }

    try {
      bookingService.cancelReservation(reservationId, authStore.userEmail)
      reservations.value = reservations.value.filter((r) => r.id !== reservationId)
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel reservation'
      return { success: false, error: message }
    }
  }

  return {
    reservations,
    loading,
    error,
    loadUserReservations,
    loadFutureReservations,
    createReservation,
    cancelReservation,
  }
})
