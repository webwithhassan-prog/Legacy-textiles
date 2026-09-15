import sharp from "sharp";
import fs from "node:fs";

const dir = "public/images";
let totalBefore = 0;
let totalAfter = 0;

for (const f of fs.readdirSync(dir)) {
  if (!/\.jpe?g$/i.test(f)) continue;
  const path = `${dir}/${f}`;
  const before = fs.statSync(path).size;
  const buf = await sharp(path).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  const tmp = `${path}.tmp`;
  fs.writeFileSync(tmp, buf);
  fs.renameSync(tmp, path);
  const after = buf.length;
  totalBefore += before;
  totalAfter += after;
  console.log(`${f}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
}

console.log(`\nTotal: ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfter / 1024).toFixed(0)}KB`);
