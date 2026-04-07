export default defineEventHandler(async (event) => {
    const { newsApiKey, newsApiBaseUrl } = useRuntimeConfig()
    const { page, id } = getQuery(event)

    const url = new URL(newsApiBaseUrl)
    url.searchParams.set('apikey', newsApiKey)

    if (id) {
        url.searchParams.set('id', String(id))
    } else {
        url.searchParams.set('size', '10')
        if (page) url.searchParams.set('page', String(page))
    }

    return $fetch(url.toString())
})
