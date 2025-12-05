import { Hono, type Context } from 'hono'
import * as userRouterervice from '../services/user.service'
import { isAdmin, protect } from '../middlewares'
import { zValidator, UserCreateSchema, UserLoginSchema } from '../models/zod.schema'
import type { UserCreate, UserLogin } from '../models/zod.schema'

const userRouter = new Hono()

// Create User
userRouter.post('/', zValidator('json', UserCreateSchema), async (c) => {
  const userBody = c.req.valid('json') as UserCreate
  
  const data = await userRouterervice.createUser(userBody);
  return c.json(data)
})

// Get All userRouter
userRouter.get('/', protect, isAdmin, async (c: Context) => {
  const data = await userRouterervice.getUsers();
  return c.json(data)
})


// Login User
userRouter.post('/login', zValidator('json', UserLoginSchema), async (c) => {
  const userBody = c.req.valid('json') as UserLogin
  const data = await userRouterervice.loginUser(userBody);
  return c.json(data)
})


// Get Single User
userRouter.get('/:id', async (c: Context) => {
  const id = c.req.param('id')
  return c.json({ message: `User ${id}` })
})

// Get User Profile
userRouter.get('/profile', (c) => {
  return c.json({ message: 'User Profile' })
})

export default userRouter
