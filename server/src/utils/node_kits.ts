import path from 'path';
import fs from 'fs';
import os from 'os';
import fsPromise from 'fs/promises';
import http from 'http';
import https from 'https';
import crypto from 'crypto';
import { spawn } from 'child_process';
import { exec as execCb } from 'child_process';
import util from 'node:util';


const exec = util.promisify(execCb);

const projectPath = process.cwd();


// ========================= 基础工具 =========================
export const getHomeDir = (): string => os.homedir();

export const coreSize = (): number => os.cpus().length;

export function idIncrement(filepath: string): number {
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, '1', 'utf-8');
        return 1;
    }
    const id = fs.readFileSync(filepath, 'utf-8');
    const newId = id ? parseInt(id) + 1 : 1;
    fs.writeFileSync(filepath, newId.toString(), 'utf-8');
    return newId;
}

export const abspath = (dir: string) => path.join(projectPath, dir);
export const timestamp = (): number => Date.now();
export const timestampFile = (ext: string) => `${timestamp()}.${ext}`;

export const uuidv4 = (): string => crypto.randomUUID({ disableEntropyCache: true });
export const uuidv4Hex = (): string => crypto.randomUUID({ disableEntropyCache: true }).replace(/-/g, '');


// ========================= 文件/目录 =========================
export async function mkdir(dir: string) {
    try {
        await fsPromise.access(dir);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            await fsPromise.mkdir(dir, { recursive: true });
        }
    }
}

export function mkdirSync(folderPath: string) {
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
}

export const dirExists = (dir: string): boolean => fs.existsSync(dir);
export const fileExists = (filepath: string): boolean => fs.existsSync(filepath);

export const readFileSyncUTF8 = (filePath: string): string => fs.readFileSync(filePath, 'utf-8');

export async function write2File(file: string, message: string) {
    try {
        await fsPromise.writeFile(file, message, { flag: 'a' });
    } catch (error: any) {
        console.error(`Error writing file: ${error.message}`);
    }
}

// ========================= 子进程 =========================

export async function wrapperSpawn(
    command: string,
    cwd?: string,
    args: string[] = [],
    callback?: (msg: string) => void
): Promise<boolean> {
    return new Promise((resolve) => {
        let finished = false;
        const cp = spawn(command, args, { cwd });

        const handleExit = (code: number) => {
            if (finished) return;
            finished = true;
            if (code === 0) resolve(true);
            else {
                console.error(`处理 ${command} 失败, Code: ${code}`);
                resolve(false);
            }
        };

        cp.on('close', handleExit);
        cp.on('error', (err) => {
            if (finished) return;
            finished = true;
            console.error(`${command} 出错啦:`, err);
            resolve(false);
        });

        cp.stdout.on('data', (data) => {
            const info = data.toString();
            console.log(`[stdout] ${info}`);
            callback?.(info);
        });

        cp.stderr.on('data', (data) => {
            const info = data.toString();
            console.error(`[stderr] ${info}`);
            callback?.(info);
        });
    });
}

export function newThreadTask(nodeScriptPath: string, args: string[] = []) {
    const honoProcess = spawn('node', [nodeScriptPath, ...args]);
    honoProcess.stdout.on('data', (data) => console.log(`stdout: ${data}`));
    honoProcess.stderr.on('data', (data) => console.error(`stderr: ${data}`));
    honoProcess.on('close', (code) => console.log(`Hono process exited with code ${code}`));

    process.on('SIGINT', () => {
        honoProcess.kill();
        process.exit();
    });
    process.on('SIGTERM', () => {
        honoProcess.kill();
        process.exit();
    });
}

// ========================= 网络 =========================

export function downloadFromUrl(
    url: string,
    outputFilePath: string,
    progressCallback?: (total: number, downloaded: number) => void,
    callback?: () => void
): Promise<boolean> {
    return new Promise((resolve) => {
        const protocol = url.startsWith('https') ? https : http;
        const fileStream = fs.createWriteStream(outputFilePath);

        protocol.get(url, (res) => {
            const total = parseInt(res.headers['content-length'] || '0', 10);
            let cur = 0;

            res.on('data', (chunk) => {
                cur += chunk.length;
                progressCallback?.(total, cur);
            });

            res.pipe(fileStream);
            fileStream.on('finish', () => {
                callback?.();
                resolve(true);
            });
        }).on('error', (err) => {
            fs.unlink(outputFilePath, () => {});
            console.error(err);
            resolve(false);
        });
    });
}

// ========================= Hash & Crypto =========================

export function createHashSync(text: string, type: string) {
    return crypto.createHash(type).update(text).digest('hex');
}
export const creatMD5HashSync = (text: string) => createHashSync(text, 'md5');
export const creatSHA1HashSync = (text: string) => createHashSync(text, 'sha1');
export const creatSHA256HashSync = (text: string) => createHashSync(text, 'sha256');

export function createHmacSync(text: string, secret: string, type = 'sha1') {
    return crypto.createHmac(type, secret).update(text).digest('hex');
}

export function generateKeyPairSync(): [string, string] {
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 520,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });
    return [keyPair.publicKey, keyPair.privateKey];
}

export function publicEncrypt(plaintext: string, publicKey: string): string {
    return crypto.publicEncrypt(publicKey, Buffer.from(plaintext)).toString('base64');
}

export function privateDecrypt(ciphertextBase64: string, privateKey: string): string {
    return crypto.privateDecrypt(privateKey, Buffer.from(ciphertextBase64, 'base64')).toString();
}

export function privateEncrypt(plaintext: string, privateKey: string): string {
    return crypto.privateEncrypt(privateKey, Buffer.from(plaintext)).toString('base64');
}

export function publicDecrypt(ciphertextBase64: string, publicKey: string): string {
    return crypto.publicDecrypt(publicKey, Buffer.from(ciphertextBase64, 'base64')).toString();
}


// ========================= 其他工具 =========================
export function secondsToHms(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const pad = (num: number) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}
