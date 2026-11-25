/**
 * Signed session cookie (HMAC-SHA256 via Web Crypto, so it runs in proxy.ts and on the server).
 * Payload is not secret (an editor's display name + expiry); the signature makes it unforgeable.
 */
export const SESSION_COOKIE = "sl_admin";
export const SESSION_DAYS = 7;

export type Session = { name: string; exp: number };

const enc = new TextEncoder();
const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const fromB64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));

export function sessionSecret(): string | null {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 16) return s;
  // Development convenience only. Production must set SESSION_SECRET.
  return process.env.NODE_ENV === "production" ? null : "dev-only-secret-change-me-please";
}

async function hmac(data: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

/** Constant-time comparison so signatures can't be guessed byte by byte. */
export function safeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function signSession(name: string): Promise<string> {
  const secret = sessionSecret();
  if (!secret) throw new Error("SESSION_SECRET is not set");
  const payload = b64url(enc.encode(JSON.stringify({ name, exp: Date.now() + SESSION_DAYS * 864e5 } satisfies Session)));
  return `${payload}.${b64url(await hmac(payload, secret))}`;
}

export async function verifySession(token: string | undefined): Promise<Session | null> {
  const secret = sessionSecret();
  if (!token || !secret) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  try {
    if (!safeEqual(fromB64url(sig), await hmac(payload, secret))) return null;
    const s = JSON.parse(new TextDecoder().decode(fromB64url(payload))) as Session;
    if (typeof s.name !== "string" || typeof s.exp !== "number" || s.exp < Date.now()) return null;
    return s;
  } catch {
    return null;
  }
}
