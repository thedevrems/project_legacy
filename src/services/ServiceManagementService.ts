import type { Service, CreateServiceDto } from '@/models/Service'
import { serviceRepository } from '@/repositories/ServiceRepository'
import { slotRepository } from '@/repositories/SlotRepository'
import { generateId } from '@/utils/idGenerator'

/**
 * Service for managing services (business logic)
 */
export class ServiceManagementService {
  /**
   * Get all services
   */
  getAllServices(): Service[] {
    return serviceRepository.findAll()
  }

  /**
   * Get a service by ID
   */
  getServiceById(id: string): Service | undefined {
    return serviceRepository.findById(id)
  }

  /**
   * Search services by query
   */
  searchServices(query: string): Service[] {
    return serviceRepository.search(query)
  }

  /**
   * Create a new service
   */
  createService(data: CreateServiceDto): Service {
    // Validate required fields
    if (!data.name || data.name.trim() === '') {
      throw new Error('Service name is required')
    }

    // Check for duplicate name
    const existing = serviceRepository.findByName(data.name)
    if (existing) {
      throw new Error('A service with this name already exists')
    }

    // Validate duration if provided
    if (data.duration !== undefined && data.duration <= 0) {
      throw new Error('Duration must be a positive number')
    }

    const service: Service = {
      id: generateId('svc'),
      name: data.name.trim(),
      description: data.description?.trim(),
      duration: data.duration,
      createdAt: new Date().toISOString(),
    }

    return serviceRepository.create(service)
  }

  /**
   * Update an existing service
   */
  updateService(id: string, data: Partial<CreateServiceDto>): Service {
    const existing = serviceRepository.findById(id)
    if (!existing) {
      throw new Error('Service not found')
    }

    // Validate name if provided
    if (data.name !== undefined) {
      if (data.name.trim() === '') {
        throw new Error('Service name cannot be empty')
      }

      // Check for duplicate name (excluding current service)
      const duplicate = serviceRepository.findByName(data.name)
      if (duplicate && duplicate.id !== id) {
        throw new Error('A service with this name already exists')
      }
    }

    // Validate duration if provided
    if (data.duration !== undefined && data.duration <= 0) {
      throw new Error('Duration must be a positive number')
    }

    const updated = serviceRepository.update(id, {
      ...data,
      name: data.name?.trim(),
      description: data.description?.trim(),
    })

    if (!updated) {
      throw new Error('Failed to update service')
    }

    return updated
  }

  /**
   * Delete a service and all its associated slots
   */
  deleteService(id: string): void {
    const service = serviceRepository.findById(id)
    if (!service) {
      throw new Error('Service not found')
    }

    // Delete all slots associated with this service
    slotRepository.deleteByServiceId(id)

    // Delete the service
    serviceRepository.delete(id)
  }
}

// Singleton instance
export const serviceManagementService = new ServiceManagementService()
