<script setup lang="ts">
import LoginModal from '~/components/Auth/LoginModal.vue';
import { useLoginModal } from '~/composables/Auth/useLoginModal';

const { isOpen, articleTitle, close } = useLoginModal()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <LoginModal
    :open="isOpen"
    :article-title="articleTitle ?? undefined"
    @close="close"
  />
</template>
