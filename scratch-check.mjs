import { chromium } from "playwright";

const base = "https://yootaejeong.github.io";
const shots = "C:/Users/User/yootaejeong-github-io/shots";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (msg) => { if (msg.type() === "error") errors.push(`console: ${msg.text()}`); });

async function shot(name) { await page.screenshot({ path: `${shots}/${name}.png` }); }

await page.goto(base, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(150);
await shot("01-intro-loader");

await page.waitForTimeout(1600);
await shot("02-after-intro");

await page.goto(`${base}/about/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1600);
await shot("03-about-loaded");
await page.mouse.wheel(0, 600);
await page.waitForTimeout(700);
await shot("04-about-scrolled");

console.log("ERRORS:", JSON.stringify(errors, null, 2));
await browser.close();
