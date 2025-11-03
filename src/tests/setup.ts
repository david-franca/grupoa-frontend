import { setActivePinia, createPinia } from 'pinia'
import { beforeEach } from 'vitest'

// Antes de cada arquivo de teste, crie um novo Pinia
beforeEach(() => {
  setActivePinia(createPinia())
})
