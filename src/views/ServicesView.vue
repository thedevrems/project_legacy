<template>
  <div class="services">
    <h1>Available Services</h1>

    <div v-if="servicesStore.loading" class="loading">Loading services...</div>

    <div v-else-if="servicesStore.services.length === 0" class="empty-state">
      <p>No services available at the moment.</p>
      <p v-if="authStore.isAdmin">
        <router-link to="/admin">Go to Admin Panel to add services</router-link>
      </p>
    </div>

    <div v-else class="services-grid">
      <div v-for="service in servicesStore.services" :key="service.id" class="service-card">
        <h3>{{ service.name }}</h3>
        <p v-if="service.description" class="description">{{ service.description }}</p>
        <p v-if="service.duration" class="duration">Duration: {{ service.duration }} minutes</p>
        <router-link
          :to="{ name: 'service-detail', params: { id: service.id } }"
          class="btn btn-primary"
        >
          View & Book
        </router-link>
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
.services {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.loading,
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.empty-state a {
  color: #42b983;
  text-decoration: underline;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.service-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  flex-grow: 1;
  line-height: 1.6;
}

.duration {
  color: #42b983;
  font-weight: 500;
  margin-bottom: 1rem;
}

.service-card .btn {
  margin-top: auto;
}
</style>
