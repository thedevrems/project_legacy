<template>
  <div class="service-detail-page">
    <div class="container">
      <div v-if="!service" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Chargement des détails...</p>
      </div>

      <div v-else>
        <!-- Service Header -->
        <div class="page-navigation">
          <router-link to="/services" class="back-link">
            <span class="back-arrow">←</span>
            Retour aux services
          </router-link>
        </div>

        <div class="service-header">
          <h1 class="service-title">{{ service.name }}</h1>
          <p v-if="service.description" class="service-description">
            {{ service.description }}
          </p>
          <div v-if="service.duration" class="service-meta">
            <span class="meta-icon">⏱</span>
            <span class="meta-text">{{ service.duration }} minutes</span>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Slots Section -->
        <div class="slots-section">
          <div class="section-header">
            <h2 class="section-title">Créneaux Disponibles</h2>
          </div>

          <div v-if="slotsStore.loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>Chargement des créneaux...</p>
          </div>

          <div v-else-if="slotsStore.slots.length === 0" class="empty-state">
            <div class="empty-icon">📅</div>
            <h3 class="empty-title">Aucun créneau disponible</h3>
            <p class="empty-text">
              Il n'y a pas de créneaux horaires disponibles pour ce service actuellement.
            </p>
          </div>

          <div v-else class="slots-grid">
            <div v-for="slot in slotsStore.slots" :key="slot.id" class="slot-card">
              <div class="slot-header">
                <div class="slot-datetime">{{ formatDateTime(slot.datetime) }}</div>
                <div class="slot-capacity" :class="{ 'capacity-low': slotsStore.getAvailableCapacity(slot.id) === 0 }">
                  <span class="capacity-count">{{ slotsStore.getAvailableCapacity(slot.id) }}</span>
                  <span class="capacity-separator">/</span>
                  <span class="capacity-total">{{ slot.capacity }}</span>
                </div>
              </div>

              <button
                class="btn btn-block"
                :class="slotsStore.isSlotAvailable(slot.id) ? 'btn-primary' : 'btn-secondary'"
                :disabled="!slotsStore.isSlotAvailable(slot.id) || bookingInProgress"
                @click="handleBookSlot(slot.id)"
              >
                {{ slotsStore.isSlotAvailable(slot.id) ? 'Réserver' : 'Complet' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Message -->
        <transition name="fade">
          <div v-if="message" :class="['message-toast', messageType + '-message']">
            {{ message }}
          </div>
        </transition>
      </div>
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
  return date.toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
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
    message.value = 'Réservation confirmée ! Consultez "Mes Réservations" pour la voir.'
    messageType.value = 'success'
    // Reload slots to update available capacity
    slotsStore.loadFutureSlotsByService(serviceId.value)
  } else {
    message.value = result.error || 'Échec de la réservation'
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
.service-detail-page {
  min-height: calc(100vh - 200px);
  padding: var(--space-10) 0;
}

/* ============================================
   NAVIGATION
   ============================================ */

.page-navigation {
  margin-bottom: var(--space-8);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
}

.back-link:hover {
  color: var(--color-black);
  background-color: var(--color-gray-100);
}

.back-arrow {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

/* ============================================
   SERVICE HEADER
   ============================================ */

.service-header {
  text-align: center;
  margin-bottom: var(--space-10);
}

.service-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-black);
  color: var(--color-black);
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
}

.service-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 600px;
  margin: 0 auto var(--space-6);
}

.service-meta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  background-color: var(--color-black);
  color: var(--color-white);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.meta-icon {
  font-size: var(--font-size-base);
}

/* ============================================
   SECTION HEADER
   ============================================ */

.section-header {
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ============================================
   LOADING STATE
   ============================================ */

.loading-state {
  text-align: center;
  padding: var(--space-16) var(--space-6);
  color: var(--color-text-secondary);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-gray-200);
  border-top-color: var(--color-black);
  border-radius: 50%;
  margin: 0 auto var(--space-4);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ============================================
   EMPTY STATE
   ============================================ */

.empty-state {
  text-align: center;
  padding: var(--space-16) var(--space-6);
}

.empty-icon {
  font-size: var(--font-size-5xl);
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

.empty-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin-bottom: var(--space-3);
}

.empty-text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  max-width: 400px;
  margin: 0 auto;
}

/* ============================================
   SLOTS GRID
   ============================================ */

.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}

.slot-card {
  background-color: var(--color-white);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-base);
}

.slot-card:hover {
  border-color: var(--color-black);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.slot-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-5);
  gap: var(--space-4);
}

.slot-datetime {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-black);
  line-height: var(--line-height-tight);
  flex: 1;
  text-transform: capitalize;
}

.slot-capacity {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
  font-family: var(--font-family-mono);
  font-weight: var(--font-weight-bold);
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-gray-100);
  border-radius: var(--radius-md);
  white-space: nowrap;
}

.capacity-count {
  font-size: var(--font-size-lg);
  color: var(--color-black);
}

.capacity-separator {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.capacity-total {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.capacity-low {
  background-color: var(--color-danger-bg);
}

.capacity-low .capacity-count {
  color: var(--color-danger);
}

/* ============================================
   MESSAGE TOAST
   ============================================ */

.message-toast {
  position: fixed;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-2xl);
  z-index: var(--z-tooltip);
  max-width: 90%;
  text-align: center;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all var(--transition-base);
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .service-detail-page {
    padding: var(--space-8) 0;
  }

  .service-title {
    font-size: var(--font-size-3xl);
  }

  .service-description {
    font-size: var(--font-size-base);
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }

  .slots-grid {
    gap: var(--space-4);
  }

  .slot-card {
    padding: var(--space-5);
  }

  .message-toast {
    bottom: var(--space-6);
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 480px) {
  .service-detail-page {
    padding: var(--space-6) 0;
  }

  .service-title {
    font-size: var(--font-size-2xl);
  }

  .slots-grid {
    grid-template-columns: 1fr;
  }

  .slot-header {
    flex-direction: column;
    gap: var(--space-3);
  }

  .slot-capacity {
    align-self: flex-start;
  }
}
</style>
