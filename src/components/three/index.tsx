"use client";

import dynamic from "next/dynamic";

/** Client-only entry points for the WebGL scenes (no SSR for three.js). */
export const CrestScene = dynamic(() => import("./CrestScene"), { ssr: false });
export const RegisterField = dynamic(() => import("./RegisterField"), { ssr: false });
export const ImigongoWall = dynamic(() => import("./ImigongoWall"), { ssr: false });
