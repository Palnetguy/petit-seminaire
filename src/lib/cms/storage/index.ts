import "server-only";
import type { ContentStorage } from "./types";

/**
 * Selects where content is stored.
 *   CMS_STORAGE=local     → JSON files in /content (default when running `npm run dev`)
 *   CMS_STORAGE=readonly  → bundled JSON, no saving (default in production, e.g. Vercel)
 * Future: CMS_STORAGE=database → add ./database.ts implementing ContentStorage.
 */
export async function getStorage(): Promise<ContentStorage> {
  const mode = process.env.CMS_STORAGE ?? (process.env.NODE_ENV === "production" ? "readonly" : "local");
  if (mode === "local") return (await import("./local")).localStorage;
  return (await import("./readonly")).readonlyStorage;
}

export type { ContentStorage, FileChange } from "./types";
