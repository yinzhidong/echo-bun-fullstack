import { Hono, type Context } from 'hono'
import type { FC } from 'hono/jsx'
import { useRequestContext, jsxRenderer } from 'hono/jsx-renderer'

// https://dev.to/reedho/bun-hono-vite-tailwindcss-an-amazing-combination-has-just-been-revealed-1bo3
// https://hono.dev/docs/guides/jsx
const uiRouter = new Hono()
// 设置jsxRenderer
uiRouter.use(jsxRenderer())

const Layout: FC = (props) => {
  return (
    <html>
      <body>
        {props.children}
      </body>
    </html>
  )
}

const Top: FC<{ messages: string[] }> = (props: {
  messages: string[]
}) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>
        })}
      </ul>
    </Layout>
  )
}


uiRouter.get('/home', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})



// useRequestContext的使用，需要配合jsxRenderer
const RequestUrlBadge: FC = () => {
  const c = useRequestContext()

  return (
    <b>
      {c.req.url}
    </b>
  )
}


uiRouter.get('/home/info', (c) => {
  return c.render(
    <div>
      你正在访问: <RequestUrlBadge />
    </div>
  )
})

export default uiRouter
