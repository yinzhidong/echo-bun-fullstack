import { genToken } from '../utils/hono'
import prisma from '../lib/prisma_mysql'
import { mathPassword } from '../utils/bun';
import { utc8 } from '../utils/tools';
import type { PageRequest} from '../models/request';
import type { UserCreate, UserLogin, UserUpdate } from '../models/zod.schema';

export const getUsersPage = async (page: PageRequest) => {
  return await prisma.users.findMany({
    skip: page.getOffset(),
    take: page.size,
    orderBy: {
      [page.getSortInfo()!.field]: page.getSortInfo()!.direction,
    }
  });
}

export const getUsers = async () => {
  return await prisma.users.findMany();
}

export const createUser = async (body: UserCreate) => {
  const { name, email, password } = body
  
  // Check for existing user
  const userExists = await prisma.users.findFirst(
    { where: { email } }
  )
  if (userExists) {
    throw new Error('User already exists')
  }

  const time = utc8();
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password,
      created_at: time,
      updated_at: time,
    }
  })

  if (!user) {
    throw new Error('Invalid user data')
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}


export const loginUser = async (body: UserLogin) => {
  const { email, password } = body
  const user = await prisma.users.findFirst(
    { where: { email } }
  )

  if (!user) {
    throw new Error('No user found with this email')
  }

  if (!(await mathPassword(password, user.password))) {
    throw new Error('Invalid credentials')
  }

  const token = await genToken(user.id.toString())
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
    // isAdmin: user.isAdmin,
  }
}


export const findById = async (id: string) => {
  const user = await prisma.users.findFirst({
    where: { id: Number(id) },
  })

  if (!user) {
    throw new Error('No user found with this id')
  }

  return user
}


export const updateUser = async (body: UserUpdate) => {
  const { id, name, email, password } = body

  const updatedUser = await prisma.users.update({
    where: { id: Number(id) },
    data: {
      name,
      email,
      password,
      updated_at: utc8(),
    }
  });

  if (!updatedUser) {
    throw new Error('Invalid user data')
  }

  return updatedUser
}