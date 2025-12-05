import { type Context, type Next } from 'hono'
import * as userDao from '../dao/users.dao'
import { verifyToken } from '../utils/hono'

// Protect Route for Authenticated Users
export const protect = async (c: Context, next: Next) => {
  let token

  if (
    c.req.header('Authorization') &&
    c.req.header('Authorization')?.startsWith('Bearer ')
  ) {
    try {
      token = c.req.header('Authorization')?.replace(/Bearer\s+/i, '')
      if (!token) {
        return c.json({ message: 'Not authorized to access this route' })
      }

      const payload = await verifyToken(token)
      console.log('protected payload==', payload);
      const { sub, role, exp } = payload

      const user = await userDao.findById(sub)

      let copUser = Object.assign({}, user) as any
      copUser['isAdmin'] = 'admin'
      c.set('user', copUser)

      await next()
    } catch (err) {
      console.log(err);
      throw new Error('Invalid token! You are not authorized!')
    }
  }

  if (!token) {
    throw new Error('Not authorized! No token found!')
  }
}

// Check if user is admin
export const isAdmin = async (c: Context, next: Next) => {
  const user = c.get('user')
  // console.log('isAdmin user==', user)

  if (user && user.isAdmin) {
    await next()
  } else {
    c.status(401)
    throw new Error('Not authorized as an admin!')
  }
}
