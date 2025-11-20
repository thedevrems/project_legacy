<template>
  <div class="my-reservations-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Mes Réservations</h1>
        <div class="title-underline"></div>
      </div>

      <div v-if="bookingsStore.loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Chargement de vos réservations...</p>
      </div>

      <div v-else-if="bookingsStore.reservations.length === 0" class="empty-state">
        <div class="empty-icon">📋</div>
        <h2 class="empty-title">Aucune réservation</h2>
        <p class="empty-text">Vous n'avez pas encore effectué de réservation.</p>
        <router-link to="/services" class="btn btn-primary btn-lg">
          Parcourir les services
        </router-link>
      </div>

      <div v-else class="reservations-list">
        <div
          v-for="reservation in bookingsStore.reservations"
          :key="reservation.id"
          class="reservation-card"
        >
          <div class="card-header">
            <div class="header-content">
              <h3 class="service-name">{{ reservation.serviceName }}</h3>
              <span
                :class="['status-badge', isFuture(reservation.slotDatetime) ? 'upcoming' : 'past']"
              >
                {{ isFuture(reservation.slotDatetime) ? 'À venir' : 'Passée' }}
              </span>
            </div>
            <p v-if="reservation.serviceDescription" class="service-description">
              {{ reservation.serviceDescription }}
            </p>
          </div>

          <div class="card-body">
            <div class="detail-row">
              <div class="detail-icon">📅</div>
              <div class="detail-content">
                <span class="detail-label">Date et heure</span>
                <span class="detail-value">{{ formatDateTime(reservation.slotDatetime) }}</span>
              </div>
            </div>

            <div v-if="reservation.serviceDuration" class="detail-row">
              <div class="detail-icon">⏱</div>
              <div class="detail-content">
                <span class="detail-label">Durée</span>
                <span class="detail-value">{{ reservation.serviceDuration }} minutes</span>
              </div>
            </div>

            <div class="detail-row">
              <div class="detail-icon">🎫</div>
              <div class="detail-content">
                <span class="detail-label">Réservé le</span>
                <span class="detail-value">{{ formatDateTime(reservation.createdAt) }}</span>
              </div>
            </div>
          </div>

          <div v-if="isFuture(reservation.slotDatetime)" class="card-footer">
            <button
              class="btn btn-danger btn-block"
              :disabled="cancellingId === reservation.id"
              @click="handleCancelReservation(reservation.id)"
            >
              {{ cancellingId === reservation.id ? 'Annulation...' : 'Annuler la réservation' }}
            </button>
          </div>
        </div>
      </div>

      <transition name="fade">
        <div v-if="message" :class="['message-toast', messageType + '-message']">
          {{ message }}
        </div>
      </transition>
    </div>
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
  return date.toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function handleCancelReservation(reservationId: string) {
  if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
    return
  }

  cancellingId.value = reservationId
  message.value = ''

  const result = bookingsStore.cancelReservation(reservationId)

  if (result.success) {
    message.value = 'Réservation annulée avec succès'
    messageType.value = 'success'
  } else {
    message.value = result.error || "Échec de l'annulation"
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
.my-reservations-page {
  min-height: calc(100vh - 200px);
  padding: var(--space-10) 0;
}

/* ============================================
   PAGE HEADER
   ============================================ */

.page-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.page-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-black);
  color: var(--color-black);
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
}

.title-underline {
  width: 80px;
  height: 4px;
  background-color: var(--color-black);
  margin: 0 auto;
}

/* ============================================
   LOADING STATE
   ============================================ */

.loading-state {
  text-align: center;
  padding: var(--space-20) var(--space-6);
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
  padding: var(--space-20) var(--space-6);
}

.empty-icon {
  font-size: var(--font-size-5xl);
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

.empty-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin-bottom: var(--space-3);
}

.empty-text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* ============================================
   RESERVATIONS LIST
   ============================================ */

.reservations-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.reservation-card {
  background-color: var(--color-white);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
}

.reservation-card:hover {
  border-color: var(--color-black);
  box-shadow: var(--shadow-lg);
}

/* ============================================
   CARD SECTIONS
   ============================================ */

.card-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-3);
}

.service-name {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin: 0;
  line-height: var(--line-height-tight);
  flex: 1;
}

.status-badge {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.status-badge.upcoming {
  background-color: var(--color-success-bg);
  color: var(--color-success);
}

.status-badge.past {
  background-color: var(--color-gray-200);
  color: var(--color-gray-600);
}

.service-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.card-body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.detail-row {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.detail-icon {
  font-size: var(--font-size-xl);
  flex-shrink: 0;
  opacity: 0.8;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

.detail-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-black);
  text-transform: capitalize;
}

.card-footer {
  padding: var(--space-6);
  background-color: var(--color-gray-100);
  border-top: 1px solid var(--color-border);
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
  .my-reservations-page {
    padding: var(--space-8) 0;
  }

  .page-header {
    margin-bottom: var(--space-8);
  }

  .page-title {
    font-size: var(--font-size-3xl);
  }

  .reservations-list {
    gap: var(--space-4);
  }

  .card-header,
  .card-body,
  .card-footer {
    padding: var(--space-5);
  }

  .service-name {
    font-size: var(--font-size-xl);
  }

  .message-toast {
    bottom: var(--space-6);
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 480px) {
  .my-reservations-page {
    padding: var(--space-6) 0;
  }

  .page-title {
    font-size: var(--font-size-2xl);
  }

  .header-content {
    flex-direction: column;
    gap: var(--space-3);
  }

  .status-badge {
    align-self: flex-start;
  }

  .card-header,
  .card-body,
  .card-footer {
    padding: var(--space-4);
  }
}
</style>
