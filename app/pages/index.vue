<script setup lang="ts">
import ErrorState from '~/components/ErrorBoundry/ErrorState.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// Persist page token in URL so pagination survives refresh
const currentToken = computed(() => (route.query.page as string) || null)

const { data, status, error, refresh } = await useFetchArticles(currentToken)

watch(status, (s) => { if (s === 'error') showError(error.value!) })

const articles = computed(() => {
  if (data.value?.status !== 'success') return []
  return data.value.results
})

const canGoNext = computed(() => !!data.value?.nextPage)
const canGoPrev = computed(() => !!route.query.page)

function goNext() {
  const nextToken = data.value?.nextPage
  if (!nextToken) return
  router.push({ query: { page: nextToken } })
}

function goPrev() {
  router.back()
}

useSeoMeta({
  title: () => t('home.seo.title'),
  description: () => t('home.seo.description'),
})
</script>

<template>
  <div class="news-list">
    <div class="news-list__header">
      <h1 class="news-list__title">{{ t('home.title') }}</h1>
      <p class="news-list__subtitle">{{ t('home.subtitle') }}</p>
    </div>

    <div v-if="status === 'pending'" class="news-list__loader">
      <div class="news-list__loader-grid">
        <div v-for="n in 10" :key="n" class="skeleton-card" />
      </div>
    </div>

    <ErrorState
      v-else-if="status === 'error'"
      :message="t('home.error')"
      @retry="refresh"
    />

    <div v-else>
      <div class="news-list__grid">
        <ArticleCard
          v-for="article in articles"
          :key="article.article_id"
          :article="article"
        />
      </div>

      <ThePagination
        :can-go-prev="canGoPrev"
        :can-go-next="canGoNext"
        @prev="goPrev"
        @next="goNext"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$grid-cols: repeat(auto-fill, minmax(300px, 1fr));

.news-list__header {
  margin-bottom: $space-xl;
}

.news-list__title {
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  letter-spacing: $letter-spacing-tight;

  @include below($bp-sm) {
    font-size: $font-size-xl;
  }
}

.news-list__subtitle {
  margin-top: $space-xs;
  font-size: $font-size-base;
  color: $color-text-muted;
}

.news-list__grid,
.news-list__loader-grid {
  display: grid;
  grid-template-columns: $grid-cols;
  gap: $space-lg;

  @include below($bp-sm) {
    grid-template-columns: 1fr;
  }
}

.skeleton-card {
  height: 340px;
  border-radius: $radius-md;
  @include skeleton;
}

.news-list__error {
  text-align: center;
  padding: $space-2xl;
  color: $color-text-muted;
}
</style>

