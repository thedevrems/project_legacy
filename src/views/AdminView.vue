<template>
  <div class="admin-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Panneau d'Administration</h1>
        <div class="title-underline"></div>
      </div>

      <div class="admin-grid">
        <!-- Services Management Section -->
        <section class="admin-section">
          <div class="section-header">
            <h2 class="section-title">Gestion des Services</h2>
          </div>

          <!-- Add Service Form -->
          <div class="form-card">
            <h3 class="form-title">Ajouter un Service</h3>
            <form @submit.prevent="handleAddService" class="admin-form">
              <div class="form-group">
                <label for="service-name">Nom *</label>
                <input
                  id="service-name"
                  v-model="newService.name"
                  type="text"
                  placeholder="Ex: Massage, Coiffure..."
                  required
                />
              </div>

              <div class="form-group">
                <label for="service-description">Description</label>
                <textarea
                  id="service-description"
                  v-model="newService.description"
                  rows="3"
                  placeholder="Description du service..."
                ></textarea>
              </div>

              <div class="form-group">
                <label for="service-duration">Durée (minutes)</label>
                <input
                  id="service-duration"
                  v-model.number="newService.duration"
                  type="number"
                  min="1"
                  placeholder="30"
                />
              </div>

              <button type="submit" class="btn btn-primary btn-block" :disabled="submitting">
                {{ submitting ? 'Ajout...' : 'Ajouter le Service' }}
              </button>
            </form>
          </div>

          <!-- Services List -->
          <div class="list-section">
            <div class="list-header">
              <h3 class="list-title">Services Existants</h3>
              <span class="list-count">{{ servicesStore.services.length }}</span>
            </div>

            <div v-if="servicesStore.services.length === 0" class="empty-state-small">
              <p>Aucun service pour le moment</p>
            </div>

            <div v-else class="items-list">
              <div v-for="service in servicesStore.services" :key="service.id" class="item-card">
                <div class="item-content">
                  <div class="item-header">
                    <h4 class="item-title">{{ service.name }}</h4>
                    <span v-if="service.duration" class="item-badge">{{ service.duration }} min</span>
                  </div>
                  <p v-if="service.description" class="item-description">
                    {{ service.description }}
                  </p>
                </div>

                <div class="item-actions">
                  <button class="btn btn-secondary btn-sm" @click="selectServiceForSlots(service.id)">
                    Gérer créneaux
                  </button>
                  <button class="btn btn-danger btn-sm" @click="handleDeleteService(service.id)">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Slots Management Section -->
        <section v-if="selectedServiceId" class="admin-section">
          <div class="section-header">
            <h2 class="section-title">
              Créneaux - {{ getServiceName(selectedServiceId) }}
            </h2>
            <button class="btn btn-outline btn-sm" @click="selectedServiceId = null">
              Fermer
            </button>
          </div>

          <!-- Add Slot Form -->
          <div class="form-card">
            <h3 class="form-title">Ajouter un Créneau</h3>
            <form @submit.prevent="handleAddSlot" class="admin-form">
              <div class="form-group">
                <label for="slot-datetime">Date & Heure *</label>
                <input
                  id="slot-datetime"
                  v-model="newSlot.datetime"
                  type="datetime-local"
                  required
                />
              </div>

              <div class="form-group">
                <label for="slot-capacity">Capacité *</label>
                <input
                  id="slot-capacity"
                  v-model.number="newSlot.capacity"
                  type="number"
                  min="1"
                  required
                  placeholder="1"
                />
              </div>

              <button type="submit" class="btn btn-primary btn-block" :disabled="submitting">
                {{ submitting ? 'Ajout...' : 'Ajouter le Créneau' }}
              </button>
            </form>
          </div>

          <!-- Slots List -->
          <div class="list-section">
            <div class="list-header">
              <h3 class="list-title">Créneaux Existants</h3>
              <div class="list-actions">
                <span class="list-count">{{ slotsStore.slots.length }}</span>
                <button class="btn btn-outline btn-sm" @click="loadSlotsForService">
                  Actualiser
                </button>
              </div>
            </div>

            <div v-if="slotsStore.slots.length === 0" class="empty-state-small">
              <p>Aucun créneau pour le moment</p>
            </div>

            <div v-else class="items-list">
              <div v-for="slot in slotsStore.slots" :key="slot.id" class="item-card">
                <div class="item-content">
                  <div class="item-header">
                    <h4 class="item-title">{{ formatDateTime(slot.datetime) }}</h4>
                    <span class="item-badge">
                      {{ slotsStore.getAvailableCapacity(slot.id) }}/{{ slot.capacity }}
                    </span>
                  </div>
                </div>

                <div class="item-actions">
                  <button class="btn btn-danger btn-sm" @click="handleDeleteSlot(slot.id)">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Message Toast -->
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
import { useServicesStore } from '@/stores/services'
import { useSlotsStore } from '@/stores/slots'
import type { CreateServiceDto } from '@/models/Service'

const servicesStore = useServicesStore()
const slotsStore = useSlotsStore()

const newService = ref<CreateServiceDto>({
  name: '',
  description: '',
  duration: undefined,
})

const newSlot = ref({
  datetime: '',
  capacity: 1,
})

const selectedServiceId = ref<string | null>(null)
const submitting = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

onMounted(() => {
  servicesStore.loadServices()
})

function getServiceName(serviceId: string): string {
  return servicesStore.services.find((s) => s.id === serviceId)?.name || 'Inconnu'
}

function selectServiceForSlots(serviceId: string) {
  selectedServiceId.value = serviceId
  loadSlotsForService()
}

function loadSlotsForService() {
  if (selectedServiceId.value) {
    slotsStore.loadSlotsByService(selectedServiceId.value)
  }
}

function handleAddService() {
  submitting.value = true
  message.value = ''

  const result = servicesStore.createService(newService.value)

  if (result.success) {
    message.value = 'Service ajouté avec succès'
    messageType.value = 'success'
    newService.value = { name: '', description: '', duration: undefined }
  } else {
    message.value = result.error || "Échec de l'ajout"
    messageType.value = 'error'
  }

  submitting.value = false
  clearMessageAfterDelay()
}

function handleDeleteService(serviceId: string) {
  if (!confirm('Supprimer ce service et tous ses créneaux ?')) {
    return
  }

  const result = servicesStore.deleteService(serviceId)

  if (result.success) {
    message.value = 'Service supprimé avec succès'
    messageType.value = 'success'
    if (selectedServiceId.value === serviceId) {
      selectedServiceId.value = null
    }
  } else {
    message.value = result.error || 'Échec de la suppression'
    messageType.value = 'error'
  }

  clearMessageAfterDelay()
}

function handleAddSlot() {
  if (!selectedServiceId.value) return

  submitting.value = true
  message.value = ''

  // Convert datetime-local to ISO format
  const datetime = new Date(newSlot.value.datetime).toISOString()

  const result = slotsStore.createSlot({
    serviceId: selectedServiceId.value,
    datetime,
    capacity: newSlot.value.capacity,
  })

  if (result.success) {
    message.value = 'Créneau ajouté avec succès'
    messageType.value = 'success'
    newSlot.value = { datetime: '', capacity: 1 }
  } else {
    message.value = result.error || "Échec de l'ajout"
    messageType.value = 'error'
  }

  submitting.value = false
  clearMessageAfterDelay()
}

function handleDeleteSlot(slotId: string) {
  if (!confirm('Supprimer ce créneau et toutes ses réservations ?')) {
    return
  }

  const result = slotsStore.deleteSlot(slotId)

  if (result.success) {
    message.value = 'Créneau supprimé avec succès'
    messageType.value = 'success'
  } else {
    message.value = result.error || 'Échec de la suppression'
    messageType.value = 'error'
  }

  clearMessageAfterDelay()
}

function formatDateTime(datetime: string): string {
  const date = new Date(datetime)
  return date.toLocaleString('fr-FR', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function clearMessageAfterDelay() {
  setTimeout(() => {
    message.value = ''
  }, 5000)
}
</script>

<style scoped>
.admin-page {
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
   ADMIN GRID
   ============================================ */

.admin-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.admin-section {
  background-color: var(--color-white);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
}

/* ============================================
   SECTION HEADER
   ============================================ */

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-4);
  border-bottom: 3px solid var(--color-black);
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-black);
  color: var(--color-black);
  margin: 0;
  letter-spacing: -0.01em;
}

/* ============================================
   FORM CARD
   ============================================ */

.form-card {
  background-color: var(--color-gray-100);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin-bottom: var(--space-8);
}

.form-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin-bottom: var(--space-6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  transition: all var(--transition-fast);
  background-color: var(--color-white);
}

.form-group input:hover,
.form-group textarea:hover {
  border-color: var(--color-border-hover);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-black);
  box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.1);
}

.form-group textarea {
  resize: vertical;
  line-height: var(--line-height-relaxed);
}

/* ============================================
   LIST SECTION
   ============================================ */

.list-section {
  margin-top: var(--space-6);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
  padding: var(--space-4);
  background-color: var(--color-gray-100);
  border-radius: var(--radius-md);
}

.list-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin: 0;
}

.list-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 var(--space-3);
  background-color: var(--color-black);
  color: var(--color-white);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-mono);
}

.list-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* ============================================
   EMPTY STATE
   ============================================ */

.empty-state-small {
  text-align: center;
  padding: var(--space-8);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* ============================================
   ITEMS LIST
   ============================================ */

.items-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5);
  background-color: var(--color-white);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.item-card:hover {
  border-color: var(--color-black);
  box-shadow: var(--shadow-md);
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.item-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin: 0;
  line-height: var(--line-height-tight);
  text-transform: capitalize;
  flex: 1;
}

.item-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.item-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-gray-800);
  color: var(--color-white);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-mono);
  white-space: nowrap;
}

.item-actions {
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
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
  .admin-page {
    padding: var(--space-8) 0;
  }

  .page-header {
    margin-bottom: var(--space-8);
  }

  .page-title {
    font-size: var(--font-size-3xl);
  }

  .admin-section {
    padding: var(--space-6);
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }

  .form-card {
    padding: var(--space-5);
  }

  .item-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-actions {
    width: 100%;
  }

  .item-actions .btn {
    flex: 1;
  }

  .list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .list-actions {
    width: 100%;
    justify-content: space-between;
  }

  .message-toast {
    bottom: var(--space-6);
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 480px) {
  .admin-page {
    padding: var(--space-6) 0;
  }

  .page-title {
    font-size: var(--font-size-2xl);
  }

  .admin-section {
    padding: var(--space-4);
    border-radius: var(--radius-lg);
  }

  .section-title {
    font-size: var(--font-size-xl);
  }

  .form-card {
    padding: var(--space-4);
  }

  .item-header {
    flex-direction: column;
    gap: var(--space-2);
  }

  .item-badge {
    align-self: flex-start;
  }
}
</style>
