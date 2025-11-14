import type { Service } from '@/models/Service'
import { BaseRepository } from './BaseRepository'

/**
 * Repository for managing services in localStorage
 */
export class ServiceRepository extends BaseRepository<Service> {
  constructor() {
    super('services')
  }

  /**
   * Find a service by name
   */
  findByName(name: string): Service | undefined {
    return this.getAll().find((service) => service.name.toLowerCase() === name.toLowerCase())
  }

  /**
   * Search services by name or description
   */
  search(query: string): Service[] {
    const lowerQuery = query.toLowerCase()
    return this.getAll().filter(
      (service) =>
        service.name.toLowerCase().includes(lowerQuery) ||
        service.description?.toLowerCase().includes(lowerQuery)
    )
  }
}

// Singleton instance
export const serviceRepository = new ServiceRepository()
