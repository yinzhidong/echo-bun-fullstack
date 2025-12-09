import { spawnCommandChunk } from "@/utils/bun";
import { fileExists } from "@/utils/nodes";



export function compressVideo(filePath: string, outputPath: string): AsyncGenerator<string> {
    if (!fileExists(filePath)) {
        throw new Error(`File ${filePath} not found`)
    }

    const args = [
        "ffmpeg",
        "-i",
        filePath,
        "-c:v",
        "libx265",
        "-x265-params",
        "crf=18",
        outputPath,
        "-y"
    ]

    return spawnCommandChunk(args, false);
}
