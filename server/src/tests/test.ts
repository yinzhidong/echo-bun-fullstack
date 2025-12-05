import fs from 'fs'

async function downloadImage(url: string, outputPath: string) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
    })
    console.log(`ok: ${res.ok}`);


    if (!res.ok || !res.body) {
        throw new Error(`Failed to download image: ${res.status} ${res.statusText}`)
    }

    const file = fs.openSync(outputPath, 'w')
    const writableStream = new WritableStream({
        write(chunk) {
            fs.writeSync(file, Buffer.from(chunk))
        },
        close() {
            fs.closeSync(file)
        }
    })

    // Node stream pipeline，保证完整写入
    await res.body.pipeTo(writableStream)


    console.log("Download complete!")
}

async function testNapiCanvas() {
    const { promises } = require('node:fs')
    const { join } = require('node:path')
    const { createCanvas, loadImage } = require('@napi-rs/canvas')

    const canvas = createCanvas(300, 320)
    const ctx = canvas.getContext('2d')

    ctx.lineWidth = 10
    ctx.strokeStyle = '#03a9f4'
    ctx.fillStyle = '#03a9f4'

    // Wall
    ctx.strokeRect(75, 140, 150, 110)

    // Door
    ctx.fillRect(130, 190, 40, 60)

    // Roof
    ctx.beginPath()
    ctx.moveTo(50, 140)
    ctx.lineTo(150, 60)
    ctx.lineTo(250, 140)
    ctx.closePath()
    ctx.stroke()


    // load images from disk or from a URL
    // const catImage = await loadImage('path/to/cat.png')
    const dogImage = await loadImage('https://avatars.githubusercontent.com/u/50206778?v=4')

    // ctx.drawImage(catImage, 0, 0, catImage.width, catImage.height)
    ctx.drawImage(dogImage, canvas.width / 2, canvas.height / 2, dogImage.width, dogImage.height)

    // export canvas as image
    const pngData = await canvas.encode('png') // JPEG, AVIF and WebP are also supported
    // encoding in libuv thread pool, non-blocking
    await promises.writeFile(join(__dirname, 'simple.png'), pngData)

}


async function main() {
    // 使用示例：
    // await downloadImage(
    //     'https://avatars.githubusercontent.com/u/50206778?v=4',
    //     // 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6287/6287974cv13d.jpg',
    //     './avatar2.png'
    // )

    await testNapiCanvas()

}

main().catch(console.error)
