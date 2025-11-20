<template>
  <div class="login">
    <div class="login-container">
      <div class="login-card">
        <div class="card-header">
          <h1 class="card-title">Connexion</h1>
          <p class="card-subtitle">Accédez à votre espace de réservation</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Adresse email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="votre.email@exemple.com"
              required
              :disabled="loading"
              autocomplete="email"
            />
          </div>

          <div v-if="error" class="error-message">{{ error }}</div>

          <button type="submit" class="btn btn-primary btn-block btn-lg" :disabled="loading">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <div class="card-footer">
          <p class="register-prompt">
            Pas encore de compte ?
            <router-link to="/register" class="register-link">Créer un compte</router-link>
          </p>
        </div>

        <div class="info-message">
          <div class="info-header">
            <span class="info-icon">ℹ</span>
            <strong>Information</strong>
          </div>
          <p class="info-text">
            Système d'authentification simplifié (email uniquement, sans mot de passe).
          </p>
          <p class="info-text">
            Accès admin : <code>admin@example.com</code> ou <code>admin@booking.com</code>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''

  const result = authStore.login(email.value)

  if (result.success) {
    const redirect = (route.query.redirect as string) || '/services'
    router.push(redirect)
  } else {
    error.value = result.error || 'Échec de la connexion'
  }

  loading.value = false
}
</script>

<style scoped>
.login {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
}

.login-container {
  width: 100%;
  max-width: 480px;
}

.login-card {
  background-color: var(--color-white);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-10);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);
}

.login-card:hover {
  box-shadow: var(--shadow-xl);
}

/* ============================================
   CARD HEADER
   ============================================ */

.card-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.card-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-black);
  color: var(--color-black);
  margin-bottom: var(--space-3);
  letter-spacing: -0.02em;
}

.card-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-normal);
}

/* ============================================
   FORM
   ============================================ */

.login-form {
  margin-bottom: var(--space-6);
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-group label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-group input {
  width: 100%;
  padding: var(--space-4);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  background-color: var(--color-white);
}

.form-group input:hover:not(:disabled) {
  border-color: var(--color-border-hover);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-black);
  box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.1);
}

.form-group input:disabled {
  background-color: var(--color-gray-100);
  cursor: not-allowed;
  opacity: 0.7;
}

/* ============================================
   CARD FOOTER
   ============================================ */

.card-footer {
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-6);
  text-align: center;
}

.register-prompt {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.register-link {
  color: var(--color-black);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: color var(--transition-fast);
  border-bottom: 2px solid var(--color-black);
  padding-bottom: 2px;
}

.register-link:hover {
  color: var(--color-gray-700);
  border-bottom-color: var(--color-gray-700);
}

/* ============================================
   INFO BOX
   ============================================ */

.info-message {
  margin-top: var(--space-6);
  padding: var(--space-4);
  background-color: var(--color-gray-100);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.info-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  font-weight: var(--font-weight-semibold);
  color: var(--color-black);
}

.info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: var(--color-black);
  color: var(--color-white);
  border-radius: 50%;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
}

.info-text {
  color: var(--color-text-secondary);
  margin: var(--space-2) 0;
  line-height: var(--line-height-relaxed);
}

.info-text code {
  background-color: var(--color-white);
  color: var(--color-black);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border: 1px solid var(--color-border);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .login {
    padding: var(--space-4);
  }

  .login-card {
    padding: var(--space-8);
  }

  .card-title {
    font-size: var(--font-size-3xl);
  }
}

@media (max-width: 480px) {
  .login {
    padding: var(--space-3);
  }

  .login-card {
    padding: var(--space-6);
    border-radius: var(--radius-lg);
  }

  .card-title {
    font-size: var(--font-size-2xl);
  }

  .card-subtitle {
    font-size: var(--font-size-sm);
  }
}
</style>
