import "server-only";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ContentStorage, FileChange } from "./types";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const PUBLIC_DIR = path.join(ROOT, "public");

/** Resolve a path and refuse anything that escapes its base folder. */
function safeJoin(base: string, rel: string) {
  const full = path.resolve(base, rel);
  if (!full.startsWith(base + path.sep)) throw new Error("Invalid path");
  return full;
}

/** Writes go to a temp file first, then replace the original, so a crash never leaves half a file. */
async function atomicWrite(file: string, data: string | Uint8Array) {
  await mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  await writeFile(tmp, data);
  await rename(tmp, file);
}

export const localStorage: ContentStorage = {
  mode: "local",
  canWrite: true,
  description: "Saving writes directly to the JSON files in /content on this computer. Push to GitHub to publish.",
  async read(collection) {
    const raw = await readFile(safeJoin(CONTENT_DIR, `${collection}.json`), "utf8");
    return JSON.parse(raw);
  },
  async write(changes: FileChange[]) {
    for (const c of changes) {
      if (c.kind === "json") {
        await atomicWrite(safeJoin(CONTENT_DIR, `${c.collection}.json`), JSON.stringify(c.data, null, 2) + "\n");
      } else {
        if (!c.path.startsWith("uploads/")) throw new Error("Uploads must go to /public/uploads");
        await atomicWrite(safeJoin(PUBLIC_DIR, c.path), c.bytes);
      }
    }
  },
};
