<template>
  <header class="app-header">
    <div class="header-container">
      <router-link to="/" class="logo">Booking System</router-link>

      <nav v-if="authStore.isAuthenticated" class="nav-links">
        <router-link to="/services">Services</router-link>
        <router-link to="/my-reservations">My Reservations</router-link>
        <router-link v-if="authStore.isAdmin" to="/admin" class="admin-link">Admin</router-link>
      </nav>

      <div class="header-actions">
        <div v-if="authStore.isAuthenticated" class="user-info">
          <span class="user-email">{{ authStore.userEmail }}</span>
          <span v-if="authStore.isAdmin" class="admin-badge">Admin</span>
          <button class="btn btn-secondary btn-sm" @click="handleLogout">Logout</button>
        </div>
        <router-link v-else to="/login" class="btn btn-primary btn-sm">Login</router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.app-header {
  background: #2c3e50;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  white-space: nowrap;
}

.logo:hover {
  color: #42b983;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  background: rgba(255, 255, 255, 0.1);
}

.nav-links .admin-link {
  background: rgba(0, 123, 255, 0.3);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-email {
  color: #42b983;
  font-weight: 500;
}

.admin-badge {
  padding: 0.25rem 0.5rem;
  background: #007bff;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }

  .user-email {
    display: none;
  }
}
</style>
