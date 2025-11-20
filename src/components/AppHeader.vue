<template>
  <header class="app-header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <span class="logo-text">Booking</span>
        <span class="logo-dot">.</span>
      </router-link>

      <nav v-if="authStore.isAuthenticated" class="nav-links">
        <router-link to="/services" class="nav-link">Services</router-link>
        <router-link to="/my-reservations" class="nav-link">Réservations</router-link>
        <router-link v-if="authStore.isAdmin" to="/admin" class="nav-link nav-link-admin">
          Admin
        </router-link>
      </nav>

      <div class="header-actions">
        <div v-if="authStore.isAuthenticated" class="user-info">
          <span class="user-email">{{ authStore.userEmail }}</span>
          <span v-if="authStore.isAdmin" class="admin-badge">ADMIN</span>
          <button class="btn btn-secondary btn-sm" @click="handleLogout">
            Déconnexion
          </button>
        </div>
        <div v-else class="auth-buttons">
          <router-link to="/register" class="btn btn-outline btn-sm">Inscription</router-link>
          <router-link to="/login" class="btn btn-primary btn-sm">Connexion</router-link>
        </div>
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
  background-color: var(--color-white);
  border-bottom: 2px solid var(--color-black);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  box-shadow: var(--shadow-sm);
}

.header-container {
  max-width: var(--container-2xl);
  margin: 0 auto;
  padding: var(--space-4) var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}

/* ============================================
   LOGO
   ============================================ */

.logo {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-black);
  color: var(--color-black);
  text-decoration: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  transition: transform var(--transition-fast);
}

.logo:hover {
  transform: scale(1.02);
}

.logo-text {
  color: var(--color-black);
}

.logo-dot {
  color: var(--color-black);
  font-size: var(--font-size-3xl);
  line-height: 0.8;
  margin-left: 2px;
}

/* ============================================
   NAVIGATION
   ============================================ */

.nav-links {
  display: flex;
  gap: var(--space-2);
  flex: 1;
  justify-content: center;
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-link:hover {
  color: var(--color-black);
  background-color: var(--color-gray-100);
}

.nav-link.router-link-active {
  color: var(--color-black);
  background-color: var(--color-black);
  color: var(--color-white);
  font-weight: var(--font-weight-semibold);
}

.nav-link-admin {
  background-color: var(--color-gray-800);
  color: var(--color-white);
}

.nav-link-admin:hover {
  background-color: var(--color-black);
  color: var(--color-white);
}

.nav-link-admin.router-link-active {
  background-color: var(--color-black);
  box-shadow: 0 0 0 2px var(--color-gray-400);
}

/* ============================================
   USER INFO & ACTIONS
   ============================================ */

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.user-email {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
}

.user-email::before {
  content: '';
  width: 6px;
  height: 6px;
  background-color: var(--color-success);
  border-radius: 50%;
  margin-right: var(--space-2);
  display: inline-block;
}

.admin-badge {
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-black);
  color: var(--color-white);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.1em;
}

.auth-buttons {
  display: flex;
  gap: var(--space-2);
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */

@media (max-width: 1024px) {
  .nav-links {
    gap: var(--space-1);
  }

  .nav-link {
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-xs);
  }

  .user-email {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-wrap: wrap;
    gap: var(--space-4);
    padding: var(--space-4);
  }

  .logo {
    font-size: var(--font-size-xl);
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: space-between;
    gap: var(--space-2);
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-border);
  }

  .nav-link {
    flex: 1;
    text-align: center;
    padding: var(--space-3);
  }

  .user-email {
    display: none;
  }

  .header-actions {
    margin-left: auto;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: var(--space-3);
  }

  .logo {
    font-size: var(--font-size-lg);
  }

  .nav-links {
    flex-direction: column;
    gap: var(--space-2);
  }

  .nav-link {
    text-align: center;
  }

  .admin-badge {
    display: none;
  }

  .auth-buttons {
    flex-direction: column;
    width: 100%;
  }

  .auth-buttons .btn {
    width: 100%;
  }
}
</style>
