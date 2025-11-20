<template>
  <div class="register">
    <div class="register-card">
      <h1>Create Account</h1>
      <p class="subtitle">Register to access the booking system</p>

      <form @submit.prevent="handleRegister">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              placeholder="John"
              required
              :disabled="loading"
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              placeholder="Doe"
              required
              :disabled="loading"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="john.doe@example.com"
            required
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="phone">Phone Number (optional)</label>
          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
            placeholder="+33 6 12 34 56 78"
            :disabled="loading"
          />
          <small class="help-text">Format: +33 6 12 34 56 78 or 0612345678</small>
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          {{ loading ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>

      <div class="login-link">
        <p>
          Already have an account?
          <router-link to="/login">Login here</router-link>
        </p>
      </div>

      <div class="info-box">
        <p><strong>Note:</strong> This is a simplified registration system.</p>
        <p>
          Admin access is automatically granted to <strong>admin@example.com</strong> and
          <strong>admin@booking.com</strong>.
        </p>
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
    error.value = result.error || 'Registration failed'
  }

  loading.value = false
}
</script>

<style scoped>
.register {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.register-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 550px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.help-text {
  display: block;
  margin-top: 0.25rem;
  color: #666;
  font-size: 0.85rem;
}

.login-link {
  margin-top: 1.5rem;
  text-align: center;
  color: #666;
}

.login-link a {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}

.info-box {
  margin-top: 2rem;
  padding: 1rem;
  background: #f0f9ff;
  border: 1px solid #bee3f8;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #2c5282;
}

.info-box p {
  margin: 0.5rem 0;
}

.info-box strong {
  color: #1a365d;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
