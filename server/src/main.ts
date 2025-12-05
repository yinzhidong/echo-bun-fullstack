import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'


import userRouter from '@/routers/user.router'
import cardGenRouter from '@/routers/card_gen.router'
import functionRouter from '@/routers/function.router'
import jsxRouter from '@/routers/jsx.router'
import htmlRouter from '@/routers/html.router'
import { errorHandler, notFound } from './middlewares'
import { PORT } from '@/utils/env'
import { appDIR } from '@/utils/nodes'
import aiProxyRouter from './routers/aiproxy.router'


// Fix BigInt issue
// https://github.com/GoogleChromeLabs/jsbi/issues/30
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
}

const staticRouter = new Hono()
const staticPath = `${appDIR}/`
console.log(`Static path: ${staticPath}`);


staticRouter.use(
  '*',
  serveStatic({
    root: staticPath,
    onNotFound: (path, c) => {
      // c.header('Cache-Control', `public, immutable, max-age=31536000`)
      console.log(`${path} is not found, you access ${c.req.path}`)
    },
  })
)


const distRouter = new Hono()
distRouter.use(
  '/',
  serveStatic({
    root: staticPath + 'dist',
    onNotFound: (path, c) => {
      // c.header('Cache-Control', `public, immutable, max-age=31536000`)
      console.log(`${path} is not found, you access ${c.req.path}`)
    },
  })
)



// Initialize the Hono app
const app = new Hono()

// Initialize middlewares
app.use('*', logger(), prettyJSON())

// Cors
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)

// Home Route
// app.get('/', (c) => c.text('Welcome to the API!'))


// User Routes
app.route('/users', userRouter)
app.route('/api/v1/generate', cardGenRouter)
app.route('/api/v1/function', functionRouter)
app.route('/jsx', jsxRouter)
app.route('/html', htmlRouter)
app.route('/api', aiProxyRouter)


app.route('/static', staticRouter)
app.route('*', distRouter)


// Error Handler
app.onError((err, c) => {
  const error = errorHandler(c)
  return error
})

// Not Found Handler
app.notFound((c) => {
  const error = notFound(c)
  return error
})


// console.log(`Bun.env ${JSON.stringify(Bun.env)}`);
const server = Bun.serve({
  port: PORT,
  fetch: app.fetch,
})
console.log(`Listening on ${server.url}`);
