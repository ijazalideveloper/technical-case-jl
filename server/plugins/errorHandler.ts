export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('error', (error, { event }) => {
    if (!event) return

    const statusCode = error.statusCode ?? 500

    if (statusCode >= 500) {
      console.error(`[API Error] ${event.method} ${event.path} → ${statusCode}:`, error.message)
    }

    // Sanitize error message for 500s
    if (statusCode === 500) {
      error.message = 'Internal Server Error'
    }
  })
})
