import { Hono, type Context } from 'hono'
// import { stream, streamText, streamSSE } from 'hono/streaming'
// import { type StreamingApi } from 'hono/utils/stream'
import * as githubCardService from '@/services/github_card.service'
import { zValidator, GithubCardSchema } from '../models/zod.schema'
import type { GithubCardType } from '../models/zod.schema'
import { getFileAbsolutePath, initFileAbsolutePath, readFileReadableStream, timestamp } from '@/utils/nodes'
import fs from 'fs'
import { APP_URL } from '@/utils/env'
import { jsonOK } from '@/utils/tools'

const cardGenRouter = new Hono()


// http://localhost:3000/api/v1/generate/tmpImg
cardGenRouter.get('/tmpImg', async (c: Context) => {
    const filePath = getFileAbsolutePath('static/qrcode.png');
    // console.log(filePath);

    // 获取图片流，返回流
    const readStream = readFileReadableStream(filePath)

    return c.body(readStream, 200, {
        'Content-Type': 'image/png',
    })
})


// https://chatgpt.com/c/69266ab5-f28c-8320-9eb0-642e32119084
cardGenRouter.post('/githubCard', zValidator('json', GithubCardSchema), async (c) => {
    const req = c.req;
    const request = req.valid('json') as GithubCardType
    const canvas = await githubCardService.generateCard(request)

    
    let pngFilePath = `static/${timestamp()}.png`
    pngFilePath = getFileAbsolutePath(pngFilePath);
    const out = fs.createWriteStream(pngFilePath);

    // 将 Node.js WriteStream 转为 Web WritableStream
    const writable = new WritableStream<Uint8Array>({
        write(chunk) {
            return new Promise<void>((resolve, reject) => {
                out.write(chunk, (err) => (err ? reject(err) : resolve()));
            });
        },
        close() {
            out.end();
        }
    });

    // 获取canvas流
    const stream = canvas.encodeStream('png');

    // 写入文件流
    await stream.pipeTo(writable);

    // preview url
    const previewUrl = `${APP_URL}/${pngFilePath}`
    return c.json(jsonOK({
        previewUrl,
    }))
})



// 返回图片流
cardGenRouter.post('/githubCard.png', zValidator('json', GithubCardSchema), async (c) => {
    const req = c.req;
    const request = req.valid('json') as GithubCardType
    const canvas = await githubCardService.generateCard(request)
    // 返回 Buffer 
    // const buffer = await canvas.encode('png');
    
    let pngFilePath = `static/${timestamp()}.png`
    pngFilePath = getFileAbsolutePath(pngFilePath);
    const out = fs.createWriteStream(pngFilePath);

    // 将 Node.js WriteStream 转为 Web WritableStream
    const writable = new WritableStream<Uint8Array>({
        write(chunk) {
            return new Promise<void>((resolve, reject) => {
                out.write(chunk, (err) => (err ? reject(err) : resolve()));
            });
        },
        close() {
            out.end();
        }
    });

    // 获取canvas流
    const stream = canvas.encodeStream('png');

    return c.body(stream, 200, {
        'Content-Type': 'image/png',
        // 'Content-Disposition': 'inline; filename="github-card.png"',
    });
})


// https://www.sheltonma.top/blog/hono/Streaming
export default cardGenRouter
