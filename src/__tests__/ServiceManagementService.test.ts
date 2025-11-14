import { describe, it, expect, beforeEach } from 'vitest'
import { ServiceManagementService } from '@/services/ServiceManagementService'
import type { CreateServiceDto } from '@/models/Service'

describe('ServiceManagementService', () => {
  let serviceManagement: ServiceManagementService

  beforeEach(() => {
    localStorage.clear()
    serviceManagement = new ServiceManagementService()
  })

  describe('createService', () => {
    it('should create a service with valid data', () => {
      const serviceData: CreateServiceDto = {
        name: 'Massage',
        description: '60 min relaxing massage',
        duration: 60,
      }

      const service = serviceManagement.createService(serviceData)

      expect(service.id).toBeDefined()
      expect(service.name).toBe(serviceData.name)
      expect(service.description).toBe(serviceData.description)
      expect(service.duration).toBe(serviceData.duration)
      expect(service.createdAt).toBeDefined()
    })

    it('should create a service with only required fields', () => {
      const serviceData: CreateServiceDto = {
        name: 'Basic Service',
      }

      const service = serviceManagement.createService(serviceData)

      expect(service.id).toBeDefined()
      expect(service.name).toBe(serviceData.name)
      expect(service.description).toBeUndefined()
      expect(service.duration).toBeUndefined()
    })

    it('should throw error when name is empty', () => {
      const serviceData: CreateServiceDto = {
        name: '   ',
      }

      expect(() => serviceManagement.createService(serviceData)).toThrow(
        'Service name is required'
      )
    })

    it('should throw error for duplicate service name', () => {
      const serviceData: CreateServiceDto = {
        name: 'Massage',
      }

      serviceManagement.createService(serviceData)

      expect(() => serviceManagement.createService(serviceData)).toThrow(
        'A service with this name already exists'
      )
    })

    it('should throw error for negative duration', () => {
      const serviceData: CreateServiceDto = {
        name: 'Test Service',
        duration: -10,
      }

      expect(() => serviceManagement.createService(serviceData)).toThrow(
        'Duration must be a positive number'
      )
    })

    it('should trim whitespace from name and description', () => {
      const serviceData: CreateServiceDto = {
        name: '  Massage  ',
        description: '  Great service  ',
      }

      const service = serviceManagement.createService(serviceData)

      expect(service.name).toBe('Massage')
      expect(service.description).toBe('Great service')
    })
  })

  describe('getAllServices', () => {
    it('should return all services', () => {
      serviceManagement.createService({ name: 'Service 1' })
      serviceManagement.createService({ name: 'Service 2' })

      const services = serviceManagement.getAllServices()
      expect(services).toHaveLength(2)
    })

    it('should return empty array when no services exist', () => {
      const services = serviceManagement.getAllServices()
      expect(services).toHaveLength(0)
    })
  })

  describe('getServiceById', () => {
    it('should return service by id', () => {
      const created = serviceManagement.createService({ name: 'Test Service' })
      const found = serviceManagement.getServiceById(created.id)

      expect(found).toBeDefined()
      expect(found?.id).toBe(created.id)
      expect(found?.name).toBe('Test Service')
    })

    it('should return undefined for non-existent id', () => {
      const found = serviceManagement.getServiceById('non-existent')
      expect(found).toBeUndefined()
    })
  })

  describe('updateService', () => {
    it('should update service successfully', () => {
      const service = serviceManagement.createService({ name: 'Old Name' })

      const updated = serviceManagement.updateService(service.id, {
        name: 'New Name',
        description: 'Updated description',
      })

      expect(updated.name).toBe('New Name')
      expect(updated.description).toBe('Updated description')
    })

    it('should throw error when updating non-existent service', () => {
      expect(() =>
        serviceManagement.updateService('non-existent', { name: 'New Name' })
      ).toThrow('Service not found')
    })

    it('should throw error when updating to empty name', () => {
      const service = serviceManagement.createService({ name: 'Test Service' })

      expect(() => serviceManagement.updateService(service.id, { name: '   ' })).toThrow(
        'Service name cannot be empty'
      )
    })

    it('should throw error when updating to duplicate name', () => {
      serviceManagement.createService({ name: 'Service 1' })
      const service2 = serviceManagement.createService({ name: 'Service 2' })

      expect(() => serviceManagement.updateService(service2.id, { name: 'Service 1' })).toThrow(
        'A service with this name already exists'
      )
    })
  })

  describe('deleteService', () => {
    it('should delete service successfully', () => {
      const service = serviceManagement.createService({ name: 'Test Service' })

      serviceManagement.deleteService(service.id)

      const found = serviceManagement.getServiceById(service.id)
      expect(found).toBeUndefined()
    })

    it('should throw error when deleting non-existent service', () => {
      expect(() => serviceManagement.deleteService('non-existent')).toThrow('Service not found')
    })
  })

  describe('searchServices', () => {
    beforeEach(() => {
      serviceManagement.createService({
        name: 'Massage Therapy',
        description: 'Relaxing massage',
      })
      serviceManagement.createService({
        name: 'Yoga Class',
        description: 'Morning yoga session',
      })
    })

    it('should find services by name', () => {
      const results = serviceManagement.searchServices('massage')
      expect(results).toHaveLength(1)
      expect(results[0]?.name).toBe('Massage Therapy')
    })

    it('should find services by description', () => {
      const results = serviceManagement.searchServices('yoga')
      expect(results).toHaveLength(1)
      expect(results[0]?.name).toBe('Yoga Class')
    })

    it('should be case insensitive', () => {
      const results = serviceManagement.searchServices('MASSAGE')
      expect(results).toHaveLength(1)
    })

    it('should return empty array when no matches found', () => {
      const results = serviceManagement.searchServices('nonexistent')
      expect(results).toHaveLength(0)
    })
  })
})
