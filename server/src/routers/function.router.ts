import { Hono } from 'hono'
import { zValidator, FunctionCreateSchema, FunctionDeleteSchema, FunctionInvokeSchema } from '@/models/zod.schema'
import type { FunctionCreateType, FunctionDeleteType, FunctionInvokeType } from '@/models/zod.schema'
import path from 'path'
import fs from 'fs'
import { runInSandbox } from '@/core/function/sandbox'
import { jsonOK } from '@/utils/tools'
import { timestamp } from '@/utils/node_kits'
import { initFileAbsolutePath } from '@/utils/nodes'


// 确保目录存在
const FUNCTIONS_DIR = initFileAbsolutePath("functions")

const functionRouter = new Hono()


// 创建函数
functionRouter.post('/create', zValidator('json', FunctionCreateSchema), async (c) => {
  const { name, content } = c.req.valid('json') as FunctionCreateType
  const filePath = path.join(FUNCTIONS_DIR, `${name}.js`);

  fs.writeFileSync(filePath, content)

  const data = {
    id:  timestamp(),
    name,
    content,
    createdAt: timestamp(),
    updatedAt: timestamp()
  }

  return c.json(jsonOK(data))
})


// 函数列表
functionRouter.get("/list", (c) => {
  const files = fs.readdirSync(FUNCTIONS_DIR).filter(f => f.endsWith(".js"));

  const functions = files.map(f => {
    let filePath = path.join(FUNCTIONS_DIR, f);

    const id = fs.statSync(filePath).ctimeMs;

    return {
      name: f.replace(".js", ""),
      content: fs.readFileSync(filePath, "utf-8"),
      createdAt: id,
      updatedAt: fs.statSync(filePath).mtimeMs,
      id,
    }
  });

  return c.json(jsonOK(functions))
});


// 删除函数
functionRouter.delete("/:name", zValidator('json', FunctionDeleteSchema), (c) => {
  const { name } = c.req.valid('json') as FunctionDeleteType
  const filePath = path.join(FUNCTIONS_DIR, `${name}.js`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return c.json({ message: `Function ${name} deleted` })
  } else {
    return c.json({ message: `Function ${name} not found` }, 404)
  }
});



// 调用函数
functionRouter.post("/invoke", zValidator('json', FunctionInvokeSchema), async (c) => {
  const body = c.req.valid('json') as FunctionInvokeType
  const code = body.code;

  const ctx = {
    body
  }

  const result = await runInSandbox(code, ctx, 2000);
  return c.json(jsonOK(result));
})

// functionRouter.post("/invoke/:name/", async (c) => {
//   const name = c.req.param("name")
//   const filePath = path.join(FUNCTIONS_DIR, `${name}.js`);

//   if (!fs.existsSync(filePath)) {
//     return c.json({ message: `Function ${name} not found` }, 404)
//   }

//   const code = fs.readFileSync(filePath, "utf-8");
//   const body = await c.req.json()

//   const ctx = {
//     body
//   }

//   const result = await runInSandbox(code, ctx, 2000);
//   return c.json(result);
// })


export default functionRouter
