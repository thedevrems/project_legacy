<template>
  <div class="services-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Services Disponibles</h1>
        <div class="title-underline"></div>
      </div>

      <div v-if="servicesStore.loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Chargement des services...</p>
      </div>

      <div v-else-if="servicesStore.services.length === 0" class="empty-state">
        <div class="empty-icon">📋</div>
        <h2 class="empty-title">Aucun service disponible</h2>
        <p class="empty-text">Il n'y a pas de services disponibles pour le moment.</p>
        <router-link v-if="authStore.isAdmin" to="/admin" class="btn btn-primary btn-lg">
          Ajouter un service
        </router-link>
      </div>

      <div v-else class="services-grid">
        <div v-for="service in servicesStore.services" :key="service.id" class="service-card">
          <div class="card-content">
            <h3 class="service-name">{{ service.name }}</h3>
            <p v-if="service.description" class="service-description">
              {{ service.description }}
            </p>
            <div v-if="service.duration" class="service-meta">
              <span class="meta-label">Durée</span>
              <span class="meta-value">{{ service.duration }} min</span>
            </div>
          </div>
          <div class="card-actions">
            <router-link
              :to="{ name: 'service-detail', params: { id: service.id } }"
              class="btn btn-primary btn-block"
            >
              Voir les créneaux
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useServicesStore } from '@/stores/services'
import { useAuthStore } from '@/stores/auth'

const servicesStore = useServicesStore()
const authStore = useAuthStore()

onMounted(() => {
  servicesStore.loadServices()
})
</script>

<style scoped>
.services-page {
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
   SERVICES GRID
   ============================================ */

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-8);
}

.service-card {
  background-color: var(--color-white);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-base);
  min-height: 200px;
}

.service-card:hover {
  border-color: var(--color-black);
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.card-content {
  flex: 1;
  margin-bottom: var(--space-6);
}

.service-name {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-tight);
}

.service-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-4);
}

.service-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-gray-100);
  border-radius: var(--radius-md);
  margin-top: auto;
}

.meta-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  font-family: var(--font-family-mono);
}

.card-actions {
  margin-top: auto;
  padding-top: var(--space-4);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .services-page {
    padding: var(--space-8) 0;
  }

  .page-header {
    margin-bottom: var(--space-8);
  }

  .page-title {
    font-size: var(--font-size-3xl);
  }

  .services-grid {
    gap: var(--space-6);
  }

  .service-card {
    padding: var(--space-6);
  }
}

@media (max-width: 480px) {
  .services-page {
    padding: var(--space-6) 0;
  }

  .page-title {
    font-size: var(--font-size-2xl);
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
