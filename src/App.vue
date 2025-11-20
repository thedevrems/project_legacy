<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/AppHeader.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <div id="app">
    <AppHeader />
    <main class="main-content">
      <RouterView />
    </main>
    <footer class="app-footer">
      <div class="footer-content">
        <p class="footer-text">&copy; 2025 Booking System</p>
        <p class="footer-tagline">Construit avec Vue.js</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* ============================================
   APP LAYOUT
   ============================================ */

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
}

.main-content {
  flex: 1;
  padding: var(--space-8) 0;
  background-color: var(--color-background-alt);
}

.app-footer {
  background-color: var(--color-black);
  color: var(--color-text-inverse);
  padding: var(--space-8) 0;
  margin-top: auto;
  border-top: 1px solid var(--color-gray-800);
}

.footer-content {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-6);
  text-align: center;
}

.footer-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-2);
}

.footer-tagline {
  font-size: var(--font-size-xs);
  color: var(--color-gray-400);
  font-weight: var(--font-weight-normal);
}

/* ============================================
   BUTTON VARIANTS
   ============================================ */

.btn-primary {
  background-color: var(--color-black);
  color: var(--color-white);
  border-color: var(--color-black);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-black-muted);
  border-color: var(--color-black-muted);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-secondary {
  background-color: var(--color-white);
  color: var(--color-black);
  border-color: var(--color-gray-300);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-gray-100);
  border-color: var(--color-gray-400);
}

.btn-danger {
  background-color: var(--color-danger);
  color: var(--color-white);
  border-color: var(--color-danger);
}

.btn-danger:hover:not(:disabled) {
  background-color: #B91C1C;
  border-color: #B91C1C;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-admin {
  background-color: var(--color-secondary);
  color: var(--color-white);
  border-color: var(--color-secondary);
}

.btn-admin:hover:not(:disabled) {
  background-color: var(--color-secondary-hover);
  border-color: var(--color-secondary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-black);
  border-color: var(--color-black);
}

.btn-outline:hover:not(:disabled) {
  background-color: var(--color-black);
  color: var(--color-white);
}

.btn-block {
  width: 100%;
  display: flex;
}

.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--font-size-lg);
}

/* ============================================
   CARDS & CONTAINERS
   ============================================ */

.card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card-header {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 2px solid var(--color-gray-100);
}

.card-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
}

.card-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-2);
}

.card-body {
  margin-bottom: var(--space-6);
}

.card-footer {
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-gray-200);
}

/* ============================================
   MESSAGES & ALERTS
   ============================================ */

.message {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border: 2px solid;
  margin-bottom: var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.error-message {
  background-color: var(--color-danger-bg);
  color: #991B1B;
  border-color: var(--color-danger-border);
}

.success-message {
  background-color: var(--color-success-bg);
  color: #166534;
  border-color: var(--color-success-border);
}

.info-message {
  background-color: var(--color-info-bg);
  color: #164E63;
  border-color: var(--color-info-border);
}

.warning-message {
  background-color: var(--color-warning-bg);
  color: #9A3412;
  border-color: var(--color-warning-border);
}

/* ============================================
   FORM GROUPS
   ============================================ */

.form-group {
  margin-bottom: var(--space-6);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
}

.form-group-inline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

.form-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.form-actions-center {
  justify-content: center;
}

.form-actions-end {
  justify-content: flex-end;
}

/* ============================================
   LISTS
   ============================================ */

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  transition: background-color var(--transition-fast);
}

.list-item:hover {
  background-color: var(--color-gray-100);
}

.list-item:last-child {
  border-bottom: none;
}

/* ============================================
   BADGES & TAGS
   ============================================ */

.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-primary {
  background-color: var(--color-black);
  color: var(--color-white);
}

.badge-secondary {
  background-color: var(--color-gray-200);
  color: var(--color-gray-700);
}

.badge-success {
  background-color: var(--color-success-bg);
  color: var(--color-success);
}

.badge-danger {
  background-color: var(--color-danger-bg);
  color: var(--color-danger);
}

/* ============================================
   DIVIDERS
   ============================================ */

.divider {
  height: 1px;
  background-color: var(--color-border);
  margin: var(--space-8) 0;
  border: none;
}

.divider-thick {
  height: 2px;
  background-color: var(--color-gray-300);
}

/* ============================================
   RESPONSIVE UTILITIES
   ============================================ */

@media (max-width: 768px) {
  .main-content {
    padding: var(--space-6) 0;
  }

  .app-footer {
    padding: var(--space-6) 0;
  }

  .card {
    padding: var(--space-4);
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .card {
    border-radius: var(--radius-md);
  }
}
</style>
