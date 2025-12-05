import { spawn } from "child_process";


interface WrapperSpawnOptions {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    callback?: (msg: string, type: "stdout" | "stderr") => void;
}


export async function wrapperSpawn(
    command: string,
    args: string[] = [],
    options: WrapperSpawnOptions = {}
): Promise<boolean> {
    const { cwd, env, callback } = options;

    return new Promise((resolve, reject) => {
        let finished = false;

        const cp = spawn(command, args, { cwd, env });

        const handleExit = (code: number) => {
            if (finished) return;
            finished = true;

            if (code === 0) resolve(true);
            else {
                console.error(`处理 ${command} 失败, Code: ${code}`);
                resolve(false);
            }
        };

        cp.on("close", handleExit);

        cp.on("error", (err) => {
            if (finished) return;
            finished = true;
            console.error(`${command} 执行出错:`, err);
            resolve(false);
        });

        cp.stdout.on("data", (data) => {
            const msg = data.toString();
            console.log(`[stdout] ${msg}`);
            callback?.(msg, "stdout");
        });

        cp.stderr.on("data", (data) => {
            const msg = data.toString();
            console.error(`[stderr] ${msg}`);
            callback?.(msg, "stderr");
        });
    });
}
