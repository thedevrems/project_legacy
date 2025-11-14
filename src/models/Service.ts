/**
 * Service model representing a bookable service
 */
export interface Service {
  id: string
  name: string
  description?: string
  duration?: number // Duration in minutes
  createdAt: string
}

/**
 * Data required to create a new service
 */
export interface CreateServiceDto {
  name: string
  description?: string
  duration?: number
}
