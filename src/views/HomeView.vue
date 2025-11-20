<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Système de
          <span class="hero-highlight">Réservation</span>
        </h1>
        <p class="hero-subtitle">
          Une plateforme moderne pour gérer vos réservations de services en toute simplicité
        </p>

        <div v-if="!authStore.isAuthenticated" class="hero-actions">
          <router-link to="/register" class="btn btn-primary btn-lg">
            Créer un compte
          </router-link>
          <router-link to="/login" class="btn btn-outline btn-lg">
            Se connecter
          </router-link>
        </div>

        <div v-else class="hero-actions">
          <router-link to="/services" class="btn btn-primary btn-lg">
            Parcourir les services
          </router-link>
          <router-link to="/my-reservations" class="btn btn-secondary btn-lg">
            Mes réservations
          </router-link>
          <router-link v-if="authStore.isAdmin" to="/admin" class="btn btn-admin btn-lg">
            Administration
          </router-link>
        </div>
      </div>
    </div>

    <div class="features-section">
      <div class="section-header">
        <h2 class="section-title">Fonctionnalités</h2>
        <div class="title-underline"></div>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-number">01</div>
          <h3 class="feature-title">Réservation Rapide</h3>
          <p class="feature-description">
            Parcourez les services disponibles et réservez vos créneaux horaires en quelques clics
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-number">02</div>
          <h3 class="feature-title">Gestion Simplifiée</h3>
          <p class="feature-description">
            Consultez et annulez vos réservations à venir à tout moment depuis votre espace personnel
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-number">03</div>
          <h3 class="feature-title">Interface Moderne</h3>
          <p class="feature-description">
            Profitez d'une interface épurée et intuitive avec des mises à jour en temps réel
          </p>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="stat-item">
        <div class="stat-value">Simple</div>
        <div class="stat-label">Interface intuitive</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">Rapide</div>
        <div class="stat-label">Réservation instantanée</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">Fiable</div>
        <div class="stat-label">Système sécurisé</div>
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
  min-height: calc(100vh - 200px);
}

/* ============================================
   HERO SECTION
   ============================================ */

.hero {
  background-color: var(--color-white);
  padding: var(--space-20) var(--space-6);
  border-bottom: 2px solid var(--color-black);
}

.hero-content {
  max-width: var(--container-lg);
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-black);
  color: var(--color-black);
  margin-bottom: var(--space-6);
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.hero-highlight {
  display: block;
  background: linear-gradient(to right, var(--color-black) 0%, var(--color-gray-700) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto var(--space-10);
  line-height: var(--line-height-relaxed);
  font-weight: var(--font-weight-normal);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

/* ============================================
   FEATURES SECTION
   ============================================ */

.features-section {
  background-color: var(--color-background-alt);
  padding: var(--space-20) var(--space-6);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-black);
  color: var(--color-black);
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.title-underline {
  width: 80px;
  height: 4px;
  background-color: var(--color-black);
  margin: 0 auto;
}

.features-grid {
  max-width: var(--container-xl);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.feature-card {
  background-color: var(--color-white);
  padding: var(--space-8);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  position: relative;
}

.feature-card:hover {
  border-color: var(--color-black);
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.feature-number {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-black);
  color: var(--color-gray-200);
  margin-bottom: var(--space-4);
  font-family: var(--font-family-mono);
}

.feature-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin-bottom: var(--space-4);
}

.feature-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

/* ============================================
   STATS SECTION
   ============================================ */

.stats-section {
  background-color: var(--color-black);
  color: var(--color-white);
  padding: var(--space-16) var(--space-6);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-12);
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-black);
  margin-bottom: var(--space-2);
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-gray-400);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: var(--font-weight-medium);
}

.stat-divider {
  width: 2px;
  height: 60px;
  background-color: var(--color-gray-700);
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */

@media (max-width: 1024px) {
  .hero {
    padding: var(--space-16) var(--space-6);
  }

  .hero-title {
    font-size: var(--font-size-4xl);
  }

  .hero-subtitle {
    font-size: var(--font-size-lg);
  }

  .features-section {
    padding: var(--space-16) var(--space-6);
  }

  .stats-section {
    padding: var(--space-12) var(--space-6);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: var(--space-12) var(--space-4);
  }

  .hero-title {
    font-size: var(--font-size-3xl);
  }

  .hero-subtitle {
    font-size: var(--font-size-base);
    margin-bottom: var(--space-8);
  }

  .hero-actions {
    flex-direction: column;
    gap: var(--space-3);
  }

  .hero-actions .btn {
    width: 100%;
  }

  .features-section {
    padding: var(--space-12) var(--space-4);
  }

  .section-title {
    font-size: var(--font-size-3xl);
  }

  .features-grid {
    gap: var(--space-6);
  }

  .feature-card {
    padding: var(--space-6);
  }

  .stats-section {
    gap: var(--space-8);
    padding: var(--space-10) var(--space-4);
  }

  .stat-divider {
    display: none;
  }

  .stat-value {
    font-size: var(--font-size-3xl);
  }
}

@media (max-width: 480px) {
  .hero {
    padding: var(--space-10) var(--space-3);
  }

  .hero-title {
    font-size: var(--font-size-2xl);
  }

  .features-section {
    padding: var(--space-10) var(--space-3);
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }

  .feature-number {
    font-size: var(--font-size-2xl);
  }

  .feature-title {
    font-size: var(--font-size-xl);
  }

  .stats-section {
    flex-direction: column;
    gap: var(--space-6);
  }
}
</style>
