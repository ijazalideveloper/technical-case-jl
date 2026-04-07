<script setup lang="ts">
import { useAuth } from '~/composables/Auth/useAuth'
import { useLoginModal } from '~/composables/Auth/useLoginModal';

const { t } = useI18n()
const { user, isLoggedIn, logout } = useAuth()

const { open } = useLoginModal()
</script>

<template>
  <header class="navbar">
    <div class="navbar__inner">
      <NuxtLink to="/" class="navbar__brand">
        <span class="navbar__brand-icon">N</span>
        <span class="navbar__brand-text">{{ t('nav.brand') }}</span>
      </NuxtLink>

      <nav class="navbar__nav">
        <NuxtLink to="/" class="navbar__nav-link" active-class="navbar__nav-link--active">
          {{ t('nav.home') }}
        </NuxtLink>
      </nav>

      <div class="navbar__auth">
        <template v-if="isLoggedIn">
          <span class="navbar__user-name">{{ user!.name }}</span>
          <button class="navbar__logout-btn" @click="logout">
            {{ t('nav.logout') }}
          </button>
        </template>
        <button v-else class="navbar__login-btn" @click="open()">
          {{ t('nav.login') }}
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: $color-bg-dark;
  box-shadow: $shadow-md;
  height: $navbar-height;
}

.navbar__inner {
  @include container;
  @include flex(center);
  height: 100%;
  gap: $space-lg;
}

.navbar__brand {
  @include flex(center);
  gap: $space-sm;
  flex-shrink: 0;
}

.navbar__brand-icon {
  @include flex(center, center);
  width: $icon-size-sm;
  height: $icon-size-sm;
  background-color: $color-primary;
  color: $color-text-white;
  border-radius: $radius-sm;
  font-weight: $font-weight-bold;
  font-size: $font-size-lg;
}

.navbar__brand-text {
  color: $color-text-white;
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  letter-spacing: $letter-spacing-tight;
}

.navbar__nav {
  @include flex(center);
  gap: $space-sm;
  flex: 1;

  @include below($bp-sm) {
    display: none;
  }
}

.navbar__nav-link {
  color: $color-text-white-dim;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  padding: $space-xs $space-sm;
  border-radius: $radius-sm;
  transition: color $transition-fast, background-color $transition-fast;

  &:hover {
    color: $color-text-white;
    background-color: $color-white-hover-bg;
  }

  &--active {
    color: $color-text-white;
  }
}

.navbar__auth {
  @include flex(center);
  gap: $space-sm;
  margin-left: auto;
  flex-shrink: 0;
}

.navbar__user-name {
  color: $color-text-white-dim;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
}

.navbar__login-btn {
  @include btn-primary;
}

.navbar__logout-btn {
  @include btn-secondary;
  padding: $space-xs $space-md;
}
</style>
