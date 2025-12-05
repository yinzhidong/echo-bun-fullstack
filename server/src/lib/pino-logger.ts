
// import pino from "pino";
// import pretty from "pino-pretty";
// import EnvSchemaType from "@/utils/env";


// https://juejin.cn/post/7335245199109455908
// export function pinoLogger() {
//     return pino(
//         {
//             level: EnvSchemaType.LOG_LEVEL || "info",
//         },
//         EnvSchemaType.NODE_ENV === "prod" ? undefined : pretty({
//             colorize: true,
//         })
//     );
// }


// const destination = pino.destination({
//   dest: "./my-app.log",
//   minLength: 4096, // 设置缓冲区大小
//   sync: false,
// });

// export const logger = pino(destination);
