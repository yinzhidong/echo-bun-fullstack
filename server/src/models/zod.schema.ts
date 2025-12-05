import type { ZodSchema } from 'zod'
import * as z from 'zod'
import type { Context, ValidationTargets } from 'hono'
import { zValidator as zv } from '@hono/zod-validator'


// https://github.com/honojs/middleware/issues/154
export const zValidator = <T extends ZodSchema, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result, c: Context) => {
    if (!result.success) {
      throw new Error(result.error.message)
    }
  })


export const UserCreateSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  isAdmin: z.boolean().optional(), // 可选布尔值
})


export const UserLoginSchema = z.object({
  email: z.email(),
  password: z.string(),
})


export const GithubCardSchema = z.object({
  gitHubUrl: z.string(),
  summary: z.string(),
})


export const FunctionCreateSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  content: z.string(),
})

export const FunctionDeleteSchema = FunctionCreateSchema.omit({ content: true });


export const FunctionInvokeSchema = z.object({
  code: z.string(),
})


// export type UserCreate = {
//     name: string;
//     email: string;
//     password: string;
// }

// 使用 z.infer 类型推导
export type UserCreate = z.infer<typeof UserCreateSchema>

export type UserUpdate = Partial<UserCreate> & {
    id: number;
}

export type UserContext = {
    id: number;
}

export type UserLogin = {
    email: string;
    password: string;
}



export type GithubCardType = z.infer<typeof GithubCardSchema>

export type FunctionCreateType = z.infer<typeof FunctionCreateSchema>
export type FunctionDeleteType = z.infer<typeof FunctionDeleteSchema>
export type FunctionInvokeType = z.infer<typeof FunctionInvokeSchema>
