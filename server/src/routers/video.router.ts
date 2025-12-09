import { Hono } from 'hono'
import { VideoCompressSchema, zValidator, type VideoCompressType } from '@/models/zod.schema';
import { compressVideo } from '@/services/video.service';
import { streamSSE } from 'hono/streaming';
import { dirName, timestampFilename } from '@/utils/nodes';

const videoRouter = new Hono()


// https://hono.dev/docs/helpers/streaming
videoRouter.post("/compress", zValidator('json', VideoCompressSchema), async (c) => {
    const { filePath } = c.req.valid('json') as VideoCompressType

    const outputDir = dirName(filePath)
    const outputFilename = timestampFilename('output', '.mp4')
    const outputPath = outputDir + "/" + outputFilename

    return streamSSE(c, async (stream) => {
        let id = 0;

        for await (const chunk of compressVideo(filePath, outputPath)) {
            await stream.writeSSE({
                data: chunk,
                event: 'videoCompressEvent',
                id: String(id++),
            })
        }

        await stream.writeSSE({
            data: outputPath,
            event: 'videoCompressEventDown',
            id: String(id++),
        })
    });
});


export default videoRouter
