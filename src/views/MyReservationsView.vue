<template>
  <div class="my-reservations">
    <h1>My Reservations</h1>

    <div v-if="bookingsStore.loading" class="loading">Loading your reservations...</div>

    <div v-else-if="bookingsStore.reservations.length === 0" class="empty-state">
      <p>You don't have any reservations yet.</p>
      <router-link to="/services" class="btn btn-primary">Browse Services</router-link>
    </div>

    <div v-else class="reservations-list">
      <div
        v-for="reservation in bookingsStore.reservations"
        :key="reservation.id"
        class="reservation-card"
      >
        <div class="reservation-header">
          <h3>{{ reservation.serviceName }}</h3>
          <span
            :class="['status-badge', isFuture(reservation.slotDatetime) ? 'upcoming' : 'past']"
          >
            {{ isFuture(reservation.slotDatetime) ? 'Upcoming' : 'Past' }}
          </span>
        </div>

        <p v-if="reservation.serviceDescription" class="description">
          {{ reservation.serviceDescription }}
        </p>

        <div class="reservation-details">
          <div class="detail-item">
            <strong>Date & Time:</strong>
            {{ formatDateTime(reservation.slotDatetime) }}
          </div>
          <div v-if="reservation.serviceDuration" class="detail-item">
            <strong>Duration:</strong>
            {{ reservation.serviceDuration }} minutes
          </div>
          <div class="detail-item">
            <strong>Booked on:</strong>
            {{ formatDateTime(reservation.createdAt) }}
          </div>
        </div>

        <button
          v-if="isFuture(reservation.slotDatetime)"
          class="btn btn-danger"
          :disabled="cancellingId === reservation.id"
          @click="handleCancelReservation(reservation.id)"
        >
          {{ cancellingId === reservation.id ? 'Cancelling...' : 'Cancel Reservation' }}
        </button>
      </div>
    </div>

    <div v-if="message" :class="['message', messageType]">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBookingsStore } from '@/stores/bookings'

const bookingsStore = useBookingsStore()
const cancellingId = ref<string | null>(null)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

onMounted(() => {
  bookingsStore.loadUserReservations()
})

function isFuture(datetime: string): boolean {
  return new Date(datetime) > new Date()
}

function formatDateTime(datetime: string): string {
  const date = new Date(datetime)
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function handleCancelReservation(reservationId: string) {
  if (!confirm('Are you sure you want to cancel this reservation?')) {
    return
  }

  cancellingId.value = reservationId
  message.value = ''

  const result = bookingsStore.cancelReservation(reservationId)

  if (result.success) {
    message.value = 'Reservation cancelled successfully'
    messageType.value = 'success'
  } else {
    message.value = result.error || 'Failed to cancel reservation'
    messageType.value = 'error'
  }

  cancellingId.value = null

  // Clear message after 5 seconds
  setTimeout(() => {
    message.value = ''
  }, 5000)
}
</script>

<style scoped>
.my-reservations {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.loading,
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.empty-state .btn {
  margin-top: 1rem;
}

.reservations-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.reservation-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reservation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.reservation-header h3 {
  color: #2c3e50;
  margin: 0;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.upcoming {
  background: #d4edda;
  color: #155724;
}

.status-badge.past {
  background: #e2e3e5;
  color: #6c757d;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.reservation-details {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.detail-item {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-item strong {
  color: #000;
}

.message {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
