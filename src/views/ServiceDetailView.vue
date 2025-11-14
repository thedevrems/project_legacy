<template>
  <div class="service-detail">
    <div v-if="!service" class="loading">Loading service details...</div>

    <div v-else>
      <div class="service-header">
        <router-link to="/services" class="back-link">← Back to Services</router-link>
        <h1>{{ service.name }}</h1>
        <p v-if="service.description" class="description">{{ service.description }}</p>
        <p v-if="service.duration" class="duration">Duration: {{ service.duration }} minutes</p>
      </div>

      <div class="slots-section">
        <h2>Available Time Slots</h2>

        <div v-if="slotsStore.loading" class="loading">Loading slots...</div>

        <div v-else-if="slotsStore.slots.length === 0" class="empty-state">
          <p>No time slots available for this service.</p>
        </div>

        <div v-else class="slots-grid">
          <div v-for="slot in slotsStore.slots" :key="slot.id" class="slot-card">
            <div class="slot-datetime">{{ formatDateTime(slot.datetime) }}</div>
            <div class="slot-info">
              <span class="capacity">
                {{ slotsStore.getAvailableCapacity(slot.id) }} / {{ slot.capacity }} available
              </span>
            </div>
            <button
              class="btn btn-primary"
              :disabled="!slotsStore.isSlotAvailable(slot.id) || bookingInProgress"
              @click="handleBookSlot(slot.id)"
            >
              {{
                slotsStore.isSlotAvailable(slot.id) ? 'Book This Slot' : 'Fully Booked'
              }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="message" :class="['message', messageType]">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useServicesStore } from '@/stores/services'
import { useSlotsStore } from '@/stores/slots'
import { useBookingsStore } from '@/stores/bookings'

const route = useRoute()
const servicesStore = useServicesStore()
const slotsStore = useSlotsStore()
const bookingsStore = useBookingsStore()

const serviceId = computed(() => route.params.id as string)
const service = computed(() => servicesStore.services.find((s) => s.id === serviceId.value))
const bookingInProgress = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

onMounted(() => {
  servicesStore.loadServices()
  slotsStore.loadFutureSlotsByService(serviceId.value)
})

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

async function handleBookSlot(slotId: string) {
  bookingInProgress.value = true
  message.value = ''

  const result = bookingsStore.createReservation(slotId)

  if (result.success) {
    message.value = 'Booking confirmed! Check "My Reservations" to view it.'
    messageType.value = 'success'
    // Reload slots to update available capacity
    slotsStore.loadFutureSlotsByService(serviceId.value)
  } else {
    message.value = result.error || 'Failed to book slot'
    messageType.value = 'error'
  }

  bookingInProgress.value = false

  // Clear message after 5 seconds
  setTimeout(() => {
    message.value = ''
  }, 5000)
}
</script>

<style scoped>
.service-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.back-link {
  display: inline-block;
  color: #42b983;
  text-decoration: none;
  margin-bottom: 1rem;
}

.back-link:hover {
  text-decoration: underline;
}

.service-header {
  margin-bottom: 2rem;
}

.service-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.description {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.duration {
  color: #42b983;
  font-weight: 500;
}

.slots-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.loading,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.slot-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.slot-datetime {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.slot-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
}

.capacity {
  font-size: 0.9rem;
  color: #42b983;
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
