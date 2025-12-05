const { parentPort } = require("worker_threads");
const vm = require("vm");

// ========= 安全上下文 =========
const sandbox = {
  // console,
  console: Object.freeze({ log: (...args) => console.log("[sandbox]", ...args) }),
  fetch,
  Math, Number, String, Boolean, Array, Object,
  JSON, Date, RegExp, Promise, Set, Map, WeakMap,
  globalThis: {},
  self: null,

  module: { exports: {} },
  exports: {},

  // 这里放用户上下文
  ctx: null,
};

sandbox.globalThis = sandbox;
sandbox.self = sandbox;

vm.createContext(sandbox);


//
// ========= 1. 清洗 export =========
function cleanUserCode(code) {
  return code
    // export default async function () {}
    .replace(/^\s*export\s+default\s+async\s+function\s*\(([^)]*)\)\s*\{/gm,
      "exports.default = async function($1) {")
    // export default function () {}
    .replace(/^\s*export\s+default\s+function\s*\(([^)]*)\)\s*\{/gm,
      "exports.default = function($1) {")
    // export default function name() {}
    .replace(/^\s*export\s+default\s+async\s+function\s+(\w+)\s*\(/gm,
      "exports.default = async function $1(")
    .replace(/^\s*export\s+default\s+function\s+(\w+)\s*\(/gm,
      "exports.default = function $1(")

    // export async function name() {}
    .replace(/^\s*export\s+async\s+function\s+(\w+)\s*\(/gm,
      "exports.$1 = async function(")
    // export function name() {}
    .replace(/^\s*export\s+function\s+(\w+)\s*\(/gm,
      "exports.$1 = function(")

    // export const x = ...
    .replace(/export\s+const\s+(\w+)\s*=\s*/g,
      "exports.$1 = ")

    // export { a, b }
    .replace(/export\s+\{([^}]+)\};?/g, (_, names) =>
      names
        .split(",")
        .map(n => n.trim())
        .filter(Boolean)
        .map(n => `exports.${n} = ${n};`)
        .join("\n")
    )

    // 删除剩余 export 关键字（比如变量）
    .replace(/\bexport\s+/g, "");
}

//
// ========= 2. 运行包装 =========
function getWrapperCode(cleaned) {
  return `
    (function (exports, module) {
      ${cleaned}
    })(exports, module);

    (async () => {
      // module.exports 或 exports 二选一（按优先级）
      const ex = module.exports && Object.keys(module.exports).length
        ? module.exports
        : exports;

      // 优先匹配 main / default
      let fn =
        ex.main ||
        ex.default ||
        Object.values(ex).find(v => typeof v === "function");

      if (typeof fn !== "function") {
        throw new Error("No valid exported function found");
      }

      return await fn();
    })();
  `;
}



//
// ========= 3. 接收并执行用户代码 =========
parentPort.on("message", async ({ code, ctx }) => {
  try {
    // 注入用户上下文
    sandbox.ctx = ctx;

    const cleaned = cleanUserCode(code);
    const wrapped = getWrapperCode(cleaned);
    console.error(`final code: ${wrapped}`)

    const script = new vm.Script(wrapped, {
      filename: "user_code.js",

      // 显示用户代码的行数
      lineOffset: 0,
      columnOffset: 0,
    });

    const result = await script.runInContext(sandbox);

    parentPort.postMessage({ success: true, result });
  } catch (err) {
    parentPort.postMessage({
      success: false,
      error: err.message,
      stack: err.stack,
    });
  } finally {
    // 清理 ctx
    sandbox.ctx = null;
  }
});
