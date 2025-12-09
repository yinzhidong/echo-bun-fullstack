
// Match user entered password to hashed password in database
export const mathPassword = async function (enteredPassword: string, hashedPassword: string) {
    return Bun.password.verifySync(enteredPassword, hashedPassword)
}


export const hashPasswordSync = function (password: string) {
    return Bun.password.hashSync(password, {
        algorithm: 'bcrypt',
        cost: 4, // number between 4-31
    })
}


export const hashPassword = async function (password: string) {
    return await Bun.password.hash(password, {
        algorithm: 'bcrypt',
        cost: 4, // number between 4-31
    })
}





export async function getStdoutText(stdout: ReadableStream<Uint8Array>) {
    return await new Response(stdout).text();
}



// ffmpeg 输出日志都是 stderr
export const spawnCommand = async function (args: string[]): Promise<string[]> {

    const { stdout, stderr } = Bun.spawn(args, {
        // cwd: "/tmp",
        // env: { FOO: "bar" },
        stdout: "pipe",
        stderr: "pipe",
        onExit(proc, exitCode, signalCode, error) {
            // exit handler
            console.log("spawnCommand Exited with code:", exitCode, "and signal:", signalCode);
        }
    });

    const stdoutText = await getStdoutText(stdout!);
    const stderrText = await getStdoutText(stderr!);

    // console.log("stdoutText:", stdout);
    // console.log("stderrText:", stderr);

    return [stdoutText, stderrText]
}


export const spawnCommandSync = function (args: string[]) {

    const { stderr, stdout } = Bun.spawnSync(args, {
        onExit(proc, exitCode, signalCode, error) {
            // exit handler
            console.log("Exited with code:", exitCode, "and signal:", signalCode);
        },
    });

    return [stdout.toString(), stderr.toString()]
}



// 异步生成器，用于实时获取 ffmpeg 输出日志
export async function* spawnCommandChunk(args: string[], stdout: boolean = true): AsyncGenerator<string> {
    const proc = Bun.spawn(args, {
        stdout: "pipe",
        stderr: "pipe",
        onExit(proc, exitCode, signalCode) {
            console.log("spawnCommandChunk Exited with code:", exitCode, "and signal:", signalCode);
        }
    });

    let reader;
    if (stdout) {
        reader = proc.stdout!.getReader();
    } else {
        reader = proc.stderr!.getReader();
    }

    if (!reader) {
        return
    }

    try {
        while (true) {
            const { value, done } = await reader.read();

            if (done) break;
            if (value) {
                yield Buffer.from(value).toString();
            }
        }
    } finally {
        reader.releaseLock();
    }
}
