import { Worker } from "worker_threads";
import path from "path";

const workerFile = path.join(__dirname, "./sandbox_worker.js");

export interface SandboxResult {
  success: boolean;
  result?: any;
  error?: string;
  stack?: any;
}

export function runInSandbox(code: string, ctx: any = null, timeout = 1000): Promise<SandboxResult> {

  return new Promise((resolve) => {
    const worker = new Worker(workerFile, {
      // workerData: null,
      eval: false,

      // 加上 CPU Loop 限制（防死循环）
      // 加上 内存限制
      // resourceLimits: {
      //   maxOldGenerationSizeMb: 50,
      //   maxYoungGenerationSizeMb: 20,
      // },
    });

    const timer = setTimeout(async () => {
      await worker.terminate();
      resolve({ success: false, error: "Execution timeout" });
    }, timeout);

    worker.on("message", (msg: SandboxResult) => {
      clearTimeout(timer);
      worker.terminate();
      resolve(msg);
    });

    worker.on("error", async (err) => {
      clearTimeout(timer);
      await worker.terminate();
      resolve({ success: false, error: String(err), stack: err.stack });
    });

    worker.on("exit", (code) => {
      console.log(`Worker stopped with exit code ${code}`);
    });

    worker.postMessage({code, ctx});
  });
}
