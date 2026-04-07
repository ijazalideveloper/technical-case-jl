
import type { LoginPayload, LoginResponse } from '../../../app/types/auth/auth';

export default defineEventHandler(async (event): Promise<LoginResponse> => {
  const body = await readBody<LoginPayload>(event)
  const { authEmail, authPassword, authName } = useRuntimeConfig(event)
  console.log('body', body)
  console.log('authEmail', authEmail)
  console.log('authPassword', authPassword)
  console.log('authName', authName)

  if (body.email !== authEmail || body.password !== authPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  return { success: true, user: { name: authName, email: authEmail } }
})
