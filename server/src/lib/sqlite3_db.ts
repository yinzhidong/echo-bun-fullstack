import { Database } from "bun:sqlite";

// 初始化数据库
const db = new Database("qrcodes.db");
db.run("PRAGMA journal_mode = WAL;");
db.run("PRAGMA foreign_keys = ON;");


// 创建二维码表（如果不存在）
db.run(`
  CREATE TABLE IF NOT EXISTS qrcodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    image_path TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;