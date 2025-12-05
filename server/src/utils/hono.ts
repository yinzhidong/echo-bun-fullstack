import { Jwt } from 'hono/utils/jwt'

const secret = Bun.env.JWT_SECRET || 'echo'

export const genToken = async (sub: string, expInHour: number = 24, role: string | null = null) => {
  // Token expires in expInHour hours from now
  let exp = Math.floor(Date.now()) + expInHour * 60 * 60 * 1000 

  const payload = {
    sub: sub,
    role,
    exp,
  }

  return await Jwt.sign(payload, secret)
}

export const verifyToken = async (token: string) => {
  let payload = await Jwt.verify(token, secret)
  if(!payload) {
    throw new Error('Invalid token')
  }
  

  if (payload?.exp && payload.exp < Math.floor(Date.now())) {
    throw new Error('Token expired')
  }

  return payload
}
