export default defineEventHandler((event) => {
    deleteCookie(event, 'auth_user', { sameSite: 'lax' })
    return { success: true }
})
