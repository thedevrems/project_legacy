<template>
  <div class="register">
    <div class="register-container">
      <div class="register-card">
        <div class="card-header">
          <h1 class="card-title">Inscription</h1>
          <p class="card-subtitle">Créez votre compte pour accéder au système de réservation</p>
        </div>

        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Prénom *</label>
              <input
                id="firstName"
                v-model="formData.firstName"
                type="text"
                placeholder="Jean"
                required
                :disabled="loading"
                autocomplete="given-name"
              />
            </div>

            <div class="form-group">
              <label for="lastName">Nom *</label>
              <input
                id="lastName"
                v-model="formData.lastName"
                type="text"
                placeholder="Dupont"
                required
                :disabled="loading"
                autocomplete="family-name"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Adresse email *</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="jean.dupont@exemple.com"
              required
              :disabled="loading"
              autocomplete="email"
            />
          </div>

          <div class="form-group">
            <label for="phone">Téléphone (optionnel)</label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              :disabled="loading"
              autocomplete="tel"
            />
            <small class="help-text">Format : +33 6 12 34 56 78 ou 0612345678</small>
          </div>

          <div v-if="error" class="error-message">{{ error }}</div>

          <button type="submit" class="btn btn-primary btn-block btn-lg" :disabled="loading">
            {{ loading ? 'Création du compte...' : 'Créer mon compte' }}
          </button>
        </form>

        <div class="card-footer">
          <p class="login-prompt">
            Vous avez déjà un compte ?
            <router-link to="/login" class="login-link">Se connecter</router-link>
          </p>
        </div>

        <div class="info-message">
          <div class="info-header">
            <span class="info-icon">ℹ</span>
            <strong>Information</strong>
          </div>
          <p class="info-text">
            Système d'inscription simplifié. Les accès administrateur sont automatiquement accordés
            aux adresses <code>admin@example.com</code> et <code>admin@booking.com</code>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { CreateUserAccountDto } from '@/models/User'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref<CreateUserAccountDto>({
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
})

const loading = ref(false)
const error = ref('')

async function handleRegister() {
  loading.value = true
  error.value = ''

  const result = authStore.register(formData.value)

  if (result.success) {
    // Auto-login after successful registration
    const loginResult = authStore.login(formData.value.email)

    if (loginResult.success) {
      router.push('/services')
    } else {
      // If auto-login fails, redirect to login page
      router.push('/login')
    }
  } else {
    error.value = result.error || "Échec de l'inscription"
  }

  loading.value = false
}
</script>

<style scoped>
.register {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
}

.register-container {
  width: 100%;
  max-width: 580px;
}

.register-card {
  background-color: var(--color-white);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-10);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);
}

.register-card:hover {
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

.register-form {
  margin-bottom: var(--space-6);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-row .form-group {
  margin-bottom: 0;
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

.help-text {
  display: block;
  margin-top: var(--space-2);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-normal);
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

.login-prompt {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.login-link {
  color: var(--color-black);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: color var(--transition-fast);
  border-bottom: 2px solid var(--color-black);
  padding-bottom: 2px;
}

.login-link:hover {
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
  .register {
    padding: var(--space-4);
  }

  .register-card {
    padding: var(--space-8);
  }

  .card-title {
    font-size: var(--font-size-3xl);
  }

  .card-subtitle {
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .form-row .form-group {
    margin-bottom: 0;
  }
}

@media (max-width: 480px) {
  .register {
    padding: var(--space-3);
  }

  .register-card {
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
