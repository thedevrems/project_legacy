<template>
  <div class="admin">
    <h1>Admin Panel</h1>

    <div class="admin-sections">
      <!-- Services Management -->
      <section class="admin-section">
        <h2>Services Management</h2>

        <div class="add-form">
          <h3>Add New Service</h3>
          <form @submit.prevent="handleAddService">
            <div class="form-group">
              <label>Name *</label>
              <input v-model="newService.name" type="text" required />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="newService.description" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Duration (minutes)</label>
              <input v-model.number="newService.duration" type="number" min="1" />
            </div>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              {{ submitting ? 'Adding...' : 'Add Service' }}
            </button>
          </form>
        </div>

        <div class="services-list">
          <h3>Existing Services</h3>
          <div v-if="servicesStore.services.length === 0" class="empty-state">
            No services yet
          </div>
          <div v-else class="items-list">
            <div v-for="service in servicesStore.services" :key="service.id" class="item-card">
              <div class="item-info">
                <strong>{{ service.name }}</strong>
                <p v-if="service.description">{{ service.description }}</p>
                <span v-if="service.duration" class="duration">{{ service.duration }} min</span>
              </div>
              <div class="item-actions">
                <button class="btn btn-sm" @click="selectServiceForSlots(service.id)">
                  Manage Slots
                </button>
                <button class="btn btn-danger btn-sm" @click="handleDeleteService(service.id)">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Slots Management -->
      <section v-if="selectedServiceId" class="admin-section">
        <h2>Slots Management for {{ getServiceName(selectedServiceId) }}</h2>

        <div class="add-form">
          <h3>Add New Slot</h3>
          <form @submit.prevent="handleAddSlot">
            <div class="form-group">
              <label>Date & Time *</label>
              <input v-model="newSlot.datetime" type="datetime-local" required />
            </div>
            <div class="form-group">
              <label>Capacity *</label>
              <input v-model.number="newSlot.capacity" type="number" min="1" required />
            </div>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              {{ submitting ? 'Adding...' : 'Add Slot' }}
            </button>
          </form>
        </div>

        <div class="slots-list">
          <h3>Existing Slots</h3>
          <button class="btn btn-secondary btn-sm" @click="loadSlotsForService">
            Refresh Slots
          </button>
          <div v-if="slotsStore.slots.length === 0" class="empty-state">No slots yet</div>
          <div v-else class="items-list">
            <div v-for="slot in slotsStore.slots" :key="slot.id" class="item-card">
              <div class="item-info">
                <strong>{{ formatDateTime(slot.datetime) }}</strong>
                <span class="capacity">
                  Capacity: {{ slotsStore.getAvailableCapacity(slot.id) }} / {{ slot.capacity }}
                  available
                </span>
              </div>
              <div class="item-actions">
                <button class="btn btn-danger btn-sm" @click="handleDeleteSlot(slot.id)">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="message" :class="['message', messageType]">{{ message }}</div>
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
  return servicesStore.services.find((s) => s.id === serviceId)?.name || 'Unknown'
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
    message.value = 'Service added successfully'
    messageType.value = 'success'
    newService.value = { name: '', description: '', duration: undefined }
  } else {
    message.value = result.error || 'Failed to add service'
    messageType.value = 'error'
  }

  submitting.value = false
  clearMessageAfterDelay()
}

function handleDeleteService(serviceId: string) {
  if (!confirm('Delete this service and all its slots?')) {
    return
  }

  const result = servicesStore.deleteService(serviceId)

  if (result.success) {
    message.value = 'Service deleted successfully'
    messageType.value = 'success'
    if (selectedServiceId.value === serviceId) {
      selectedServiceId.value = null
    }
  } else {
    message.value = result.error || 'Failed to delete service'
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
    message.value = 'Slot added successfully'
    messageType.value = 'success'
    newSlot.value = { datetime: '', capacity: 1 }
  } else {
    message.value = result.error || 'Failed to add slot'
    messageType.value = 'error'
  }

  submitting.value = false
  clearMessageAfterDelay()
}

function handleDeleteSlot(slotId: string) {
  if (!confirm('Delete this slot and all its reservations?')) {
    return
  }

  const result = slotsStore.deleteSlot(slotId)

  if (result.success) {
    message.value = 'Slot deleted successfully'
    messageType.value = 'success'
  } else {
    message.value = result.error || 'Failed to delete slot'
    messageType.value = 'error'
  }

  clearMessageAfterDelay()
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

function clearMessageAfterDelay() {
  setTimeout(() => {
    message.value = ''
  }, 5000)
}
</script>

<style scoped>
.admin {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.admin-sections {
  display: grid;
  gap: 2rem;
}

.admin-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.admin-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #42b983;
}

.admin-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.add-form {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.item-info {
  flex: 1;
}

.item-info strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.item-info p {
  color: #666;
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.duration,
.capacity {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #e7f5ff;
  color: #1971c2;
  border-radius: 4px;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
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
