/**
 * Base repository class providing common CRUD operations with localStorage
 */
export abstract class BaseRepository<T extends { id: string }> {
  protected storageKey: string

  constructor(storageKey: string) {
    this.storageKey = storageKey
  }

  /**
   * Get all items from storage
   */
  protected getAll(): T[] {
    const data = localStorage.getItem(this.storageKey)
    return data ? JSON.parse(data) : []
  }

  /**
   * Save all items to storage
   */
  protected saveAll(items: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items))
  }

  /**
   * Find an item by ID
   */
  findById(id: string): T | undefined {
    return this.getAll().find((item) => item.id === id)
  }

  /**
   * Find all items
   */
  findAll(): T[] {
    return this.getAll()
  }

  /**
   * Create a new item
   */
  create(item: T): T {
    const items = this.getAll()
    items.push(item)
    this.saveAll(items)
    return item
  }

  /**
   * Update an existing item
   */
  update(id: string, updatedItem: Partial<T>): T | undefined {
    const items = this.getAll()
    const index = items.findIndex((item) => item.id === id)

    if (index === -1) {
      return undefined
    }

    items[index] = { ...items[index], ...updatedItem } as T
    this.saveAll(items)
    return items[index]
  }

  /**
   * Delete an item by ID
   */
  delete(id: string): boolean {
    const items = this.getAll()
    const filteredItems = items.filter((item) => item.id !== id)

    if (filteredItems.length === items.length) {
      return false
    }

    this.saveAll(filteredItems)
    return true
  }

  /**
   * Clear all items from storage
   */
  clear(): void {
    localStorage.removeItem(this.storageKey)
  }
}
