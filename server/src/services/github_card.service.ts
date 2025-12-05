import { Canvas, createCanvas, loadImage, Path2D, type CanvasGradient, type SKRSContext2D, GlobalFonts } from "@napi-rs/canvas";
import type { GithubCardType } from "@/models/zod.schema";
import { githubAPIMock } from "./mock.service";

// 注册中文字体
GlobalFonts.registerFromPath("/Users/yinzhidong/fonts/NotoSansSC-Regular.otf", "Noto Sans SC");
GlobalFonts.registerFromPath("/Users/yinzhidong/fonts/NotoSansSC-Bold.otf","Noto Sans SC");


// Canvas Logic Configuration
const WIDTH = 800;
const HEIGHT = 540;

// ICONS
const ICONS = {
    star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    fork: "M6 2a2 2 0 00-2 2v2a2 2 0 001.37 1.9c-.31.33-.67.63-1.07.9A9.15 9.15 0 00.5 13.5v.5h2v-.5a7.16 7.16 0 013.1-6.07V11a2 2 0 002 2h8a2 2 0 002-2v-3.53a7.16 7.16 0 013.1 6.07v.5h2v-.5a9.15 9.15 0 00-3.8-8.7 8.35 8.35 0 01-1.07-.9A2 2 0 0020 6V4a2 2 0 00-2-2h-1a2 2 0 00-2 2v2a2 2 0 001.37 1.9 6.27 6.27 0 00-2.87 1.6 6.27 6.27 0 00-2.87-1.6A2 2 0 0011 6V4a2 2 0 00-2-2H6z",
    issue: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
    person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
};

// Rounded rectangle
function roundedRect(
    ctx: SKRSContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    fill?: string | CanvasGradient,
    stroke?: string | CanvasGradient
) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    if (fill) ctx.fillStyle = fill;
    if (stroke) ctx.strokeStyle = stroke;
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}

// Wrap text safely
function wrapText(
    ctx: SKRSContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines = 4
) {
    let line = '';
    let lineNum = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i] ?? ''; // 防止 undefined

        const testLine = line + char;
        if (ctx.measureText(testLine).width > maxWidth) {
            ctx.fillText(line, x, y);
            line = char; // 安全赋值
            y += lineHeight;
            lineNum++;
            if (lineNum >= maxLines) {
                ctx.fillText(line + "...", x, y);
                return;
            }
        } else {
            line = testLine;
        }
    }

    if (line) ctx.fillText(line, x, y);
}


// Draw stat item
function drawStat(ctx: SKRSContext2D, index: number, y: number, label: string, value: string, path: string) {
    const x = 40 + index * 130;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1.2, 1.2);
    ctx.fillStyle = "#9CA3AF";
    ctx.fill(new Path2D(path));
    ctx.restore();

    ctx.fillStyle = "#374151";
    ctx.font = "bold 22px Inter";
    ctx.fillText(value, x + 35, y + 20);

    ctx.fillStyle = "#9CA3AF";
    ctx.font = "14px Inter";
    ctx.fillText(label, x + 35, y + 40);
}


const githubAPI = async (owner: string, name: string): Promise<any> => {
    const res = await fetch(`https://api.github.com/repos/${owner}/${name}`);
    if (!res.ok) throw new Error("GitHub API error");
    return await res.json();
}



// https://zhuanlan.zhihu.com/p/1890330803797488719
export const generateCard = async (request: GithubCardType): Promise<Canvas> => {
    const { gitHubUrl, summary } = request;

    if (!gitHubUrl) throw new Error("Invalid GitHub URL");
    if (!gitHubUrl.startsWith("https://github.com/")) throw new Error("Invalid GitHub URL");

    const repo = gitHubUrl.replace("https://github.com/", "");
    if (!repo || !repo.includes("/")) throw new Error("Invalid repo format. Use username/repo");

    const [owner, name] = repo.split("/");
    if (!owner || !name) throw new Error("Invalid repo format. Use username/repo");

    // const data: any = await githubAPI(owner as string, name as string)
    const data: any = await githubAPIMock()
    const avatarImg = await loadImage(data.owner.avatar_url);

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Top summary
    const boxX = 40, boxY = 25, boxW = WIDTH - 80;
    roundedRect(ctx, boxX, boxY, boxW, 110, 20, undefined, "rgba(45,212,191,0.4)");
    roundedRect(ctx, boxX + 25, boxY + 20, 80, 32, 16, "#2DD4BF");
    ctx.fillStyle = "#111827";
    ctx.font = "bold 14px Noto Sans SC";
    ctx.fillText("介绍", boxX + 60, boxY + 41);
    ctx.fillStyle = "#2DD4BF";
    ctx.font = "16px Noto Sans SC";
    wrapText(ctx, summary, boxX + 25, boxY + 70, boxW - 60, 26);

    // Main white card
    const cardX = 40, cardY = 160, cardW = 720, cardH = 340;
    roundedRect(ctx, cardX, cardY, cardW, cardH, 16, "#fff");

    ctx.save();
    ctx.translate(cardX, cardY);

    // Title
    ctx.font = "600 48px Inter";
    ctx.fillStyle = "#6B7280";
    const ownerText = data.owner.login + "/";
    ctx.fillText(ownerText, 40, 80);
    const ow = ctx.measureText(ownerText).width;
    ctx.fillStyle = "#111827";
    ctx.font = "bold 48px Inter";
    ctx.fillText(data.name, 40 + ow, 80);

    // Description
    ctx.fillStyle = "#4B5563";
    ctx.font = "20px Noto Sans SC";
    wrapText(ctx, data.description || "暂无描述", 40, 130, 420, 32);

    // Avatar
    ctx.save();
    roundedRect(ctx, 500, 40, 180, 180, 24);
    ctx.clip();
    ctx.drawImage(avatarImg, 500, 40, 180, 180);
    ctx.restore();

    // Stats
    drawStat(ctx, 0, 270, "Contributor", "1+", ICONS.person);
    drawStat(ctx, 1, 270, "Issue", String(data.open_issues_count), ICONS.issue);
    drawStat(ctx, 2, 270, "Stars", String(data.stargazers_count), ICONS.star);
    drawStat(ctx, 3, 270, "Forks", String(data.forks_count), ICONS.fork);

    // Github logo
    ctx.save();
    ctx.translate(630, 255);
    ctx.scale(2, 2);
    ctx.fillStyle = "#E5E7EB";
    ctx.fill(new Path2D(ICONS.github));
    ctx.restore();
    ctx.restore();

    // Bottom gradient bar
    const grad = ctx.createLinearGradient(cardX, 0, cardX + cardW, 0);
    grad.addColorStop(0, "#2DD4BF");
    grad.addColorStop(0.5, "#34D399");
    grad.addColorStop(1, "#2DD4BF");
    ctx.fillStyle = grad;
    roundedRect(ctx, cardX, cardY + cardH - 12, cardW, 12, 12, grad);

    return canvas;
};
