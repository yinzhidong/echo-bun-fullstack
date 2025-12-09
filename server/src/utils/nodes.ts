import { createReadStream, ReadStream } from 'fs'
import { Readable } from 'stream'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

import { randomUUID } from "node:crypto";
// import { performance } from "node:perf_hooks";
// import { AsyncLocalStorage } from "node:async_hooks";


// 获取当前文件所在目录
// /Users/yinzhidong/bunPros/echo-kit-api/src/utils
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const srcDIR = path.resolve(__dirname, '..') 
// console.log(`srcDIR: ${srcDIR}`);


export const appDIR = process.cwd()
// console.log(`appDIR: ${appDIR}`);

export const getFileAbsolutePath = (filePath: string): string => {
    return `${appDIR}/${filePath}`
}


export const initFileAbsolutePath = (filePath: string): string => {
    const absPath = path.join(appDIR, filePath);
    console.log(`initFileAbsolutePath: ${absPath}`);
    
    if(!fileExists(absPath)) {
        // 创建目录
        fs.mkdirSync(absPath, { recursive: true })
    }

    return absPath
}


export const fileExists = (filePath: string): boolean => {
    return fs.existsSync(filePath)
}


export const dirName = (currentPath: string): string => {
    return path.dirname(currentPath);
}



export const readFileStream = (filePath: string): ReadStream => {
    // Node ReadStream
    return createReadStream(filePath)
}


export const readStream2ReadableStream = (nodeStream: ReadStream): ReadableStream => {
    // 转 Web ReadableStream
    return Readable.toWeb(nodeStream)
}



export const readFileReadableStream = (filePath: string): ReadableStream => {
    return readStream2ReadableStream(readFileStream(filePath))
}


export async function saveFetchResponseToFile(outputPath: string, body: ReadableStream<any>) {
    const file = fs.openSync(outputPath, 'w')
    const writableStream = new WritableStream({
        write(chunk) {
            fs.writeSync(file, Buffer.from(chunk))
        },
        close() {
            fs.closeSync(file)
        }
    })

    await body.pipeTo(writableStream)
}


export const timestamp = () => {
    return new Date().getTime()
}


export const sleep = (time: number = 1000) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}


export const timestampFilename = (prefix: string = 'output', suffix: string = '.mp4') => {
    return prefix + '_' + timestamp() + suffix
}
