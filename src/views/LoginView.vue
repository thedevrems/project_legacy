<template>
  <div class="login">
    <div class="login-card">
      <h1>Login</h1>
      <p class="subtitle">Enter your email to access the booking system</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="your.email@example.com"
            required
            :disabled="loading"
          />
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="register-link">
        <p>
          Don't have an account?
          <router-link to="/register">Create one here</router-link>
        </p>
      </div>

      <div class="info-box">
        <p><strong>Note:</strong> This is a simplified authentication system (email only).</p>
        <p>
          Use <strong>admin@example.com</strong> or <strong>admin@booking.com</strong> for admin
          access.
        </p>
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
    error.value = result.error || 'Login failed'
  }

  loading.value = false
}
</script>

<style scoped>
.login {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
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

.register-link {
  margin-top: 1.5rem;
  text-align: center;
  color: #666;
}

.register-link a {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
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
</style>
