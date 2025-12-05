import * as userDao from '../dao/users.dao'
import { hashPassword } from '../utils/bun';
import { jsonOK } from '../utils/tools';
import type { UserContext, UserCreate, UserLogin, UserUpdate } from '../models/zod.schema';

export const getUsers = async () => {
    const users = await userDao.getUsers()
    return jsonOK(users)
}


export const createUser = async (body: UserCreate) => {
    const { name, email, password } = body

    const passwordHash = await hashPassword(password)
    const user = await userDao.createUser({
        name,
        email,
        password: passwordHash
        // isAdmin,
    })

    if (!user) {
        throw new Error('User creation failed')
    }

    return jsonOK({
        id: user.id,
        name: user.name,
        email: user.email,
        // isAdmin: user.isAdmin,
    })
}


export const loginUser = async (body: UserLogin) => {
    const user = await userDao.loginUser(body)
    return jsonOK(user)
}


export const getUserById = async (id: string) => {
    const user = await userDao.findById(id)
    return jsonOK(user)
}


export const getProfile = async (body: UserContext) => {
    return jsonOK(body)
}

/**
 * @api {put} /users/profile Edit User Profile
 * @apiGroup Users
 * @access Private
 */
export const editProfile = async (body: UserUpdate) => {
    const updatedUser = await userDao.updateUser(body)
    return updatedUser
}