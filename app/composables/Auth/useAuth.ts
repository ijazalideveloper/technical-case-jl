import type { AuthUser, LoginPayload, LoginResponse } from "~/types/auth/auth"

export function useAuth() {
  const authCookie = useCookie<AuthUser | null>('auth_user', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax',
  })

  const user = useState<AuthUser | null>('auth_user', () => authCookie.value)
  const isLoggedIn = computed(() => !!user.value)

  async function login(payload: LoginPayload) {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: payload,
    })
    user.value = data.user
    authCookie.value = data.user
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    authCookie.value = null
  }

  return { user, isLoggedIn, login, logout }
}

