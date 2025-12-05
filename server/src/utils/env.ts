import { config } from "dotenv";
import path from "node:path";
import { z } from "zod";


// https://bun.com/docs/runtime/environment-variables
const envFilePath = path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
)
// console.log(`process.env.NODE_ENV===>`, process.env.NODE_ENV);
// console.log(`envFilePath===>`, envFilePath);

config({
    path: envFilePath,
})

const EnvSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z.coerce.number(),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
}).superRefine((input, ctx) => {
    if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
        ctx.addIssue({
            code: z.ZodIssueCode.invalid_type,
            expected: "string",
            received: "undefined",
            path: ["DATABASE_AUTH_TOKEN"],
            message: "Must be set when NODE_ENV is 'production'",
        });
    }
});


export type EnvSchemaType = z.infer<typeof EnvSchema>;
const { data: EnvSchemaType, error } = EnvSchema.safeParse(process.env);

if (error) {
    console.error("❌ Invalid env:");
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    process.exit(1);
}



export const PORT = EnvSchemaType.PORT;
export const APP_URL = `http://localhost:${PORT}`;
// console.log(`env===`, JSON.stringify(EnvSchemaType, null, 2));
// console.log(`env2===>`, JSON.stringify(process.env, null, 2));

export default EnvSchemaType!;
