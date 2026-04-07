import type { NewsApiResponse } from '~/types/news'

export function useFetchArticles(pageToken: Ref<string | null | undefined>) {
  return useFetch<NewsApiResponse>(
    () => pageToken.value ? `/api/news?page=${pageToken.value}` : '/api/news',
    { watch: [pageToken] },
  )
}

export function useFetchArticleById(id: string) {
  return useFetch<NewsApiResponse>(`/api/news?id=${id}`)
}
