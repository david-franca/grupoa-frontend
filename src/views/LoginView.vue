<template>
  <div class="login-container-base">
    <div class="image-logo-container">
      <v-img src="./dark.png" alt="MaisA Logo" width="18rem" />
    </div>
    <div class="card-container">
      <v-card variant="text">
        <v-img src="./teacher.svg" alt="MaisA Logo" height="6rem" class="mb-4" />
        <v-card-title class="text-h5 text-center"> Sistema de Gerenciamento - IES </v-card-title>
        <v-card-subtitle class="text-center pb-4">
          Entre com sua conta para continuar
        </v-card-subtitle>
        <v-form ref="form" @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            variant="outlined"
            :rules="emailRules"
            required
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Senha"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            variant="outlined"
            :rules="passwordRules"
            required
            class="mb-2"
          ></v-text-field>

          <v-btn type="submit" color="primary" size="large" block :loading="isLoading" class="mt-2">
            Entrar
          </v-btn>
        </v-form>
        <v-card-text>
          <v-alert
            v-if="error"
            type="error"
            variant="tonal"
            closable
            @click:close="error = ''"
            class="mb-2"
          >
            {{ error }}
          </v-alert>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import authService from '@/services/authService'
import { AxiosError } from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

type VForm = InstanceType<(typeof import('vuetify/components'))['VForm']>
// --- Estado (State) ---
const isLoading = ref(false)
const email = ref('admin@example.com')
const password = ref('hashed_password_here')
const showPassword = ref(false)
const error = ref<string | null>('')
const form = ref<VForm | null>(null)

const router = useRouter()

const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido',
]
const passwordRules = [
  (v: string) => !!v || 'Senha é obrigatória',
  (v: string) => v.length >= 3 || 'Senha deve ter pelo menos 3 caracteres',
]

// --- Métodos (Methods) ---
const handleLogin = async () => {
  if (!form.value) return

  const { valid } = await form.value.validate()
  if (!valid) return

  isLoading.value = true
  error.value = ''

  try {
    await authService.login({
      email: email.value,
      password: password.value,
    })

    router.push('/students')
  } catch (err) {
    console.error(err)

    if (err instanceof AxiosError) {
      error.value = err.response?.data.errors[0]
    } else {
      error.value = 'Email ou senha inválidos'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang="css">
.login-container-base {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;

  width: 100dvw;
  height: 100dvh;
}

.image-logo-container {
  background: #020024;
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 100%,
    rgba(0, 212, 255, 1) 35%
  );
  width: 60%;
  display: flex;
  height: 100dvh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-container {
  width: 40%;
  padding: 4rem;
}

@media (max-width: 768px) {
  .login-container-base {
    flex-direction: column;
  }

  .image-logo-container {
    display: none;
  }

  .card-container {
    width: 100%;
    padding: 2rem;
  }
}
</style>
