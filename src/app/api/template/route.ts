import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  // const file = path.resolve("assets", "mail.html");
  const file = path.resolve(
    "assets",
    "c5708bc1-3af1-42ae-be0c-8b4aa98287df.json"
  );
  const template = await fs.readFileSync(file, {
    encoding: "utf8",
    flag: "r",
  });
  return new Response(template)
}

export async function POST(request: Request) {
  const { data } = await request.json();

  if (!data) return new Response("error", { status: 500 });

  if (data.design) {
    const filename = `${uuidv4()}.json`;
    const file = path.resolve("assets", filename);
    fs.writeFileSync(file, JSON.stringify(data.design), { flag: "w+" });
  }

  return new Response("Save");
}
