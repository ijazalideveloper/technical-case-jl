<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()

async function handleClear() {
  await clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtLayout>
    <div class="error-page">
      <div class="error-page__box">
        <div class="error-page__icon">⚠</div>
        <h1 class="error-page__code">{{ error.statusCode }}</h1>
        <p class="error-page__message">{{ error.message }}</p>
        <button class="error-page__btn" @click="handleClear">
          {{ t('error.goHome') }}
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.error-page {
  @include flex(center, center);
  min-height: 60vh;
  padding: $space-xl $space-md;
}

.error-page__box {
  @include flex(center, center, column);
  max-width: 480px;
  width: 100%;
  text-align: center;
  gap: $space-md;
  padding: $space-xl;
  background-color: $color-bg-white;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  box-shadow: $shadow-md;
}

.error-page__icon {
  font-size: 2.5rem;
  color: $color-primary;
  line-height: 1;
}

.error-page__code {
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.error-page__message {
  font-size: $font-size-sm;
  color: $color-text-muted;
  line-height: $line-height-relaxed;
  word-break: break-word;
}

.error-page__btn {
  @include btn-primary;
}
</style>
