<script setup lang="ts">
import type { Article } from '~/types/news'

defineProps<{
  article: Article
}>()
</script>

<template>
  <NuxtLink :to="`/news/${article.article_id}`" class="article-card">
    <div class="article-card__image-wrap">
      <img
        v-if="article.image_url"
        :src="article.image_url"
        :alt="article.title ?? ''"
        class="article-card__image"
        loading="lazy"
      />
      <div v-else class="article-card__image-placeholder">
        <span class="article-card__image-placeholder-icon">N</span>
      </div>
    </div>

    <div class="article-card__body">
      <div class="article-card__meta">
        <span class="article-card__source">{{ article.source_name }}</span>
        <span class="article-card__dot">·</span>
        <time class="article-card__date">{{ article.pubDate.slice(0, 10) }}</time>
      </div>
      <h2 class="article-card__title">{{ article.title }}</h2>
      <div class="article-card__categories">
        <span
          v-for="cat in article.category.slice(0, 2)"
          :key="cat"
          class="article-card__category"
        >
          {{ cat }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.article-card {
  @include flex(stretch, flex-start, column);
  background-color: $color-bg-white;
  border-radius: $radius-md;
  overflow: hidden;
  box-shadow: $shadow-sm;
  border: 1px solid $color-border;
  transition: box-shadow $transition-fast, transform $transition-fast, border-color $transition-fast;
  height: 100%;

  &:hover {
    box-shadow: $shadow-md;
    transform: translateY(-2px);
    border-color: $color-border-dark;
  }
}

.article-card__image-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: $color-bg-light;
  flex-shrink: 0;
}

.article-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform $transition-med;

  .article-card:hover & {
    transform: scale(1.03);
  }
}

.article-card__image-placeholder {
  @include flex(center, center);
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, $color-bg-dark 0%, $color-bg-dark-mid 100%);
}

.article-card__image-placeholder-icon {
  font-size: 2rem;
  font-weight: $font-weight-bold;
  color: $color-white-faint;
}

.article-card__body {
  @include flex(flex-start, flex-start, column);
  gap: $space-sm;
  padding: $space-md;
  flex: 1;
}

.article-card__meta {
  @include flex(center, flex-start, row, wrap);
  gap: $space-xs;
}

.article-card__source {
  @include source-label;
}

.article-card__dot {
  color: $color-text-subtle;
  font-size: $font-size-xs;
}

.article-card__date {
  font-size: $font-size-xs;
  color: $color-text-subtle;
}

.article-card__title {
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  line-height: $line-height-normal;
  @include line-clamp(3);
}

.article-card__categories {
  @include flex(center, flex-start, row, wrap);
  gap: $space-xs;
  margin-top: auto;
}

.article-card__category {
  @include badge;
}
</style>

