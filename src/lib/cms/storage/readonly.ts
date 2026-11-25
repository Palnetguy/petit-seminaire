import type { ContentStorage } from "./types";
import { bundled } from "./bundled";

export const readonlyStorage: ContentStorage = {
  mode: "readonly",
  canWrite: false,
  description:
    "Editing is turned off on the live site until a database is connected. To change content now, edit it on a computer running the site locally (or edit the files in /content) and push to GitHub.",
  async read(collection) {
    if (!(collection in bundled)) throw new Error(`Unknown collection ${collection}`);
    return structuredClone(bundled[collection]) as never;
  },
  async write() {
    throw new Error("Editing is disabled on the live site. Edit locally and push to GitHub.");
  },
};
