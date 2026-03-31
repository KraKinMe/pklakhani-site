import fs from "fs";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

async function run() {
  const filePath = path.join(process.cwd(), "public/images/hero_ca.webp");

  const file = fs.readFileSync(filePath);

  const { base64 } = await getPlaiceholder(file, { size: 16 });

  console.log("\nBLUR DATA URL:\n");
  console.log(base64);
}

run();