<script setup lang="ts">
defineProps<{
  canGoPrev: boolean
  canGoNext: boolean
}>()

defineEmits<{
  prev: []
  next: []
}>()

const { t } = useI18n()
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__btn"
      :class="{ 'pagination__btn--disabled': !canGoPrev }"
      :disabled="!canGoPrev"
      @click="$emit('prev')"
    >
      <span class="pagination__arrow">←</span>
      {{ t('pagination.prev') }}
    </button>

    <button
      class="pagination__btn"
      :class="{ 'pagination__btn--disabled': !canGoNext }"
      :disabled="!canGoNext"
      @click="$emit('next')"
    >
      {{ t('pagination.next') }}
      <span class="pagination__arrow">→</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  @include flex(center, center);
  gap: $space-md;
  padding: $space-xl 0;
}

.pagination__btn {
  @include flex(center);
  gap: $space-xs;
  padding: $space-sm $space-lg;
  background-color: $color-bg-white;
  color: $color-text-primary;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  transition: background-color $transition-fast, border-color $transition-fast,
    color $transition-fast, box-shadow $transition-fast;

  &:hover:not(:disabled) {
    background-color: $color-bg-dark;
    border-color: $color-bg-dark;
    color: $color-text-white;
    box-shadow: $shadow-sm;
  }

  &--disabled,
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.pagination__arrow {
  font-size: $font-size-base;
  line-height: 1;
}
</style>
