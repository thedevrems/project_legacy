import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Service, CreateServiceDto } from '@/models/Service'
import { serviceManagementService } from '@/services/ServiceManagementService'

/**
 * Services store
 */
export const useServicesStore = defineStore('services', () => {
  const services = ref<Service[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Load all services
   */
  function loadServices() {
    loading.value = true
    error.value = null
    try {
      services.value = serviceManagementService.getAllServices()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load services'
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new service
   */
  function createService(data: CreateServiceDto) {
    try {
      const service = serviceManagementService.createService(data)
      services.value.push(service)
      return { success: true, service }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create service'
      return { success: false, error: message }
    }
  }

  /**
   * Update a service
   */
  function updateService(id: string, data: Partial<CreateServiceDto>) {
    try {
      const updated = serviceManagementService.updateService(id, data)
      const index = services.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        services.value[index] = updated
      }
      return { success: true, service: updated }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update service'
      return { success: false, error: message }
    }
  }

  /**
   * Delete a service
   */
  function deleteService(id: string) {
    try {
      serviceManagementService.deleteService(id)
      services.value = services.value.filter((s) => s.id !== id)
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete service'
      return { success: false, error: message }
    }
  }

  /**
   * Search services
   */
  function searchServices(query: string) {
    return serviceManagementService.searchServices(query)
  }

  return {
    services,
    loading,
    error,
    loadServices,
    createService,
    updateService,
    deleteService,
    searchServices,
  }
})
