<script setup lang="ts">
import { useAuth } from '~/composables/Auth/useAuth'

const props = defineProps<{
  open: boolean
  articleTitle?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

watch(() => props.open, (val) => {
  if (!val) {
    email.value = ''
    password.value = ''
    error.value = ''
    loading.value = false
  }
})

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await login({ email: email.value, password: password.value })
    emit('close')
  } catch {
    error.value = t('auth.invalidCredentials')
  } finally {
    loading.value = false
  }
}

function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-backdrop" @click="handleBackdropClick">
        <div class="modal" role="dialog" aria-modal="true" :aria-label="t('auth.modalTitle')">
          <button class="modal__close" :aria-label="t('auth.close')" @click="emit('close')">✕</button>

          <h2 class="modal__title">{{ t('auth.modalTitle') }}</h2>

          <p v-if="articleTitle" class="modal__context">
            {{ t('auth.contextMessage', { title: articleTitle }) }}
          </p>

          <form class="modal__form" @submit.prevent="handleSubmit">
            <div class="modal__field">
              <label class="modal__label" for="login-email">{{ t('auth.email') }}</label>
              <input
                id="login-email"
                v-model="email"
                class="modal__input"
                type="email"
                autocomplete="email"
                
              />
            </div>

            <div class="modal__field">
              <label class="modal__label" for="login-password">{{ t('auth.password') }}</label>
              <input
                id="login-password"
                v-model="password"
                class="modal__input"
                type="password"
                autocomplete="current-password"
                required
              />
            </div>

            <p v-if="error" class="modal__error" role="alert">{{ error }}</p>

            <button class="modal__submit" type="submit" :disabled="loading">
              {{ loading ? t('auth.signingIn') : t('auth.signIn') }}
            </button>
          </form>

          <div class="modal__demo">
            <p class="modal__demo-title">Demo credentials</p>
            <p class="modal__demo-row"><span>Email</span><code>admin@newshub.com</code></p>
            <p class="modal__demo-row"><span>Password</span><code>password123</code></p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.6);
  @include flex(center, center);
}

.modal {
  position: relative;
  background-color: $color-bg-white;
  border-radius: $radius-md;
  padding: $space-xl;
  width: 100%;
  max-width: 420px;
  margin: $space-md;
  box-shadow: $shadow-md;
}

.modal__close {
  position: absolute;
  top: $space-md;
  right: $space-md;
  color: $color-text-muted;
  font-size: $font-size-base;
  line-height: 1;
  transition: color $transition-fast;

  &:hover {
    color: $color-text-primary;
  }
}

.modal__title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $space-md;
}

.modal__context {
  font-size: $font-size-sm;
  color: $color-text-muted;
  background-color: $color-bg-light;
  border-left: 3px solid $color-primary;
  padding: $space-sm $space-md;
  border-radius: $radius-sm;
  margin-bottom: $space-lg;
  font-style: italic;
}

.modal__form {
  @include flex(stretch, flex-start, column);
  gap: $space-md;
}

.modal__field {
  @include flex(flex-start, flex-start, column);
  gap: $space-xs;
}

.modal__label {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-text-primary;
}

.modal__input {
  width: 100%;
  padding: $space-sm $space-md;
  border: 1px solid $color-border-dark;
  border-radius: $radius-sm;
  font-size: $font-size-base;
  color: $color-text-primary;
  background-color: $color-bg-white;
  transition: border-color $transition-fast;

  &:focus {
    outline: none;
    border-color: $color-primary;
  }
}

.modal__error {
  font-size: $font-size-sm;
  color: $color-primary;
}

.modal__submit {
  @include btn-primary;
  width: 100%;
  padding: $space-sm $space-lg;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
}

.modal__demo {
  margin-top: $space-lg;
  padding: $space-sm $space-md;
  background-color: $color-bg-light;
  border-radius: $radius-sm;
  border: 1px dashed $color-border-dark;
}

.modal__demo-title {
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  color: $color-text-muted;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: $space-xs;
}

.modal__demo-row {
  @include flex(center, space-between);
  font-size: $font-size-sm;
  color: $color-text-primary;

  code {
    font-size: $font-size-sm;
    color: $color-primary;
    background: none;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity $transition-fast;

  .modal {
    transition: transform $transition-fast;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal {
    transform: translateY(-12px);
  }
}
</style>
