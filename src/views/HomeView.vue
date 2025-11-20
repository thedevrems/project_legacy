<template>
  <div class="home">
    <h1>Welcome to Booking System</h1>
    <div class="home-content">
      <p>A modern booking management system built with Vue.js</p>

      <div v-if="!authStore.isAuthenticated" class="actions">
        <router-link to="/register" class="btn btn-primary">Create Account</router-link>
        <router-link to="/login" class="btn btn-secondary">Login</router-link>
      </div>

      <div v-else class="actions">
        <router-link to="/services" class="btn btn-primary">Browse Services</router-link>
        <router-link to="/my-reservations" class="btn btn-secondary">
          My Reservations
        </router-link>
        <router-link v-if="authStore.isAdmin" to="/admin" class="btn btn-admin">
          Admin Panel
        </router-link>
      </div>

      <div class="features">
        <div class="feature">
          <h3>📅 Easy Booking</h3>
          <p>Browse services and book available time slots effortlessly</p>
        </div>
        <div class="feature">
          <h3>🔍 Manage Reservations</h3>
          <p>View and cancel your upcoming reservations anytime</p>
        </div>
        <div class="feature">
          <h3>⚡ Simple & Fast</h3>
          <p>Clean interface with instant updates and confirmations</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.home-content {
  text-align: center;
}

.home-content > p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature {
  padding: 1.5rem;
  border-radius: 8px;
  background: #f8f9fa;
  text-align: center;
}

.feature h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature p {
  color: #666;
  line-height: 1.6;
}
</style>
