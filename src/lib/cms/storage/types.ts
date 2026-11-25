/**
 * The storage contract. The dashboard and the website only talk to this
 * interface, so moving from JSON files to a database means writing one new
 * adapter (e.g. `database.ts`) and selecting it in `index.ts`. Nothing else changes.
 */
export type StorageMode = "local" | "readonly";

export type FileChange =
  | { kind: "json"; collection: string; data: unknown }
  | { kind: "upload"; path: string; bytes: Uint8Array }; // path under /public

export interface ContentStorage {
  mode: StorageMode;
  /** Human-readable explanation shown in the dashboard. */
  description: string;
  canWrite: boolean;
  read<T = unknown>(collection: string): Promise<T>;
  /** Apply several changes together (data + meta + uploaded images). */
  write(changes: FileChange[]): Promise<void>;
}
