<script setup lang="ts">
import { useLoginModal } from '~/composables/Auth/useLoginModal';
import { useAuth } from '~/composables/Auth/useAuth';

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const { t } = useI18n()

const { data, status, error } = await useFetchArticleById(id)

const { open: openLogin, articleTitle } = useLoginModal()
const { isLoggedIn } = useAuth()

if (status.value === 'error') showError(error.value!)

const article = computed(() => data.value?.results[0]!)

watch(article, (a) => { articleTitle.value = a?.title ?? null }, { immediate: true })
onUnmounted(() => { articleTitle.value = null })

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

useSeoMeta({
  title: () => article.value?.title ?? 'Article',
  description: () => article.value?.description ?? '',
  ogImage: () => article.value?.image_url ?? undefined,
})
</script>

<template>
  <div class="article-detail">
    <button class="article-detail__back" @click="goBack">
      <span>←</span>
      {{ t('article.back') }}
    </button>

    <div v-if="status === 'pending'" class="article-detail__loader">
      <div class="skeleton skeleton--title" />
      <div class="skeleton skeleton--image" />
      <div class="skeleton skeleton--text" />
      <div class="skeleton skeleton--text skeleton--text-short" />
    </div>

    <div v-else-if="status === 'error'" class="article-detail__error">
      <p>{{ t('article.error') }}</p>
      <NuxtLink to="/" class="article-detail__back-btn">{{ t('article.returnHome') }}</NuxtLink>
    </div>

    <article v-else-if="article" class="article-detail__content">
      <div class="article-detail__meta">
        <span class="article-detail__source">{{ article.source_name }}</span>
        <span class="article-detail__dot">·</span>
        <time class="article-detail__date">{{ article.pubDate.slice(0, 10) }}</time>
        <span v-if="article.language" class="article-detail__lang">
          {{ article.language.toUpperCase() }}
        </span>
      </div>

      <h1 class="article-detail__title">{{ article.title }}</h1>

      <div class="article-detail__categories">
        <span
          v-for="cat in article.category"
          :key="cat"
          class="article-detail__category"
        >
          {{ cat }}
        </span>
      </div>

      <div v-if="article.image_url" class="article-detail__image-wrap">
        <img
          :src="article.image_url"
          :alt="article.title!"
          class="article-detail__image"
        />
      </div>

      <p v-if="article.description" class="article-detail__description">
        {{ article.description }}
      </p>

      <a
        v-if="article.link"
        :href="article.link"
        target="_blank"
        rel="noopener noreferrer"
        class="article-detail__read-more"
      >
        {{ t('article.readMore') }}
        <span>→</span>
      </a>
    </article>

    <div v-else class="article-detail__error">
      <p>{{ t('article.notFound') }}</p>
      <NuxtLink to="/" class="article-detail__back-btn">{{ t('article.returnHome') }}</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-detail {
  max-width: $article-max-width;
  margin: 0 auto;
}

.article-detail__back {
  @include flex(center);
  display: inline-flex;
  gap: $space-xs;
  color: $color-text-muted;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  margin-bottom: $space-xl;
  transition: color $transition-fast;

  &:hover {
    color: $color-primary;
  }
}

.article-detail__content {
  @include flex(flex-start, flex-start, column);
  gap: $space-lg;
}

.article-detail__meta {
  @include flex(center, flex-start, row, wrap);
  gap: $space-xs;
}

.article-detail__source {
  @include source-label;
  font-size: $font-size-sm;
}

.article-detail__dot {
  color: $color-text-subtle;
}

.article-detail__date {
  font-size: $font-size-sm;
  color: $color-text-subtle;
}

.article-detail__lang {
  font-size: $font-size-xs;
  color: $color-text-white;
  background-color: $color-bg-dark-mid;
  padding: $space-xxs $space-xs;
  border-radius: $radius-sm;
  letter-spacing: $letter-spacing-wider;
}

.article-detail__title {
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  line-height: $line-height-tight;
  letter-spacing: $letter-spacing-tight;

  @include below($bp-sm) {
    font-size: $font-size-xl;
  }
}

.article-detail__categories {
  @include flex(center, flex-start, row, wrap);
  gap: $space-xs;
}

.article-detail__category {
  @include badge;
  border: 1px solid $color-border;
}

.article-detail__image-wrap {
  border-radius: $radius-md;
  overflow: hidden;
  box-shadow: $shadow-md;
}

.article-detail__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.article-detail__description {
  font-size: $font-size-lg;
  color: $color-text-muted;
  line-height: $line-height-relaxed;
  border-left: 3px solid $color-primary;
  padding-left: $space-lg;
}

.article-detail__read-more {
  @include btn-primary;
  display: inline-flex;
  align-items: center;
  gap: $space-sm;
  align-self: flex-start;
}

.article-detail__loader {
  @include flex(flex-start, flex-start, column);
  gap: $space-lg;
}

.skeleton {
  border-radius: $radius-sm;
  @include skeleton;

  &--title {
    height: 56px;
    width: 80%;
  }

  &--image {
    height: 420px;
    border-radius: $radius-md;

    @include below($bp-sm) {
      height: 220px;
    }
  }

  &--text {
    height: 20px;
  }

  &--text-short {
    width: 60%;
  }
}

.article-detail__error {
  @include flex(center, center, column);
  text-align: center;
  padding: $space-2xl;
  color: $color-text-muted;
  gap: $space-lg;
}

.article-detail__back-btn {
  @include btn-secondary;
}
</style>
