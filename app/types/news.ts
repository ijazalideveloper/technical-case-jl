export interface Article {
  article_id: string
  title: string | null
  description: string | null
  image_url: string | null
  video_url: string | null
  link: string
  source_id: string
  source_name: string
  source_url: string
  source_icon: string
  source_priority: number
  pubDate: string
  country: string[]
  category: string[]
  language: string
  keywords: string[] | null
  creator: string[] | null
  duplicate: boolean
}

export interface NewsApiResponse {
  status: string
  totalResults: number
  results: Article[]
  nextPage: string | null
}
