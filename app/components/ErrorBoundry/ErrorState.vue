<script setup lang="ts">
defineProps<{ message?: string }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="error-state">
    <div class="error-state__icon">⚠</div>
    <p class="error-state__message">{{ message ?? 'Something went wrong. Please try again.' }}</p>
    <button class="error-state__btn" @click="$emit('retry')">Try again</button>
  </div>
</template>

<style lang="scss" scoped>
.error-state {
  @include flex(center, center, column);
  gap: $space-md;
  padding: $space-2xl $space-md;
  text-align: center;
}

.error-state__icon {
  font-size: 2rem;
  color: $color-primary;
  line-height: 1;
}

.error-state__message {
  font-size: $font-size-sm;
  color: $color-text-muted;
  line-height: $line-height-relaxed;
}

.error-state__btn {
  @include btn-primary;
}
</style>
