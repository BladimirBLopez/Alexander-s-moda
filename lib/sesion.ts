export const COOKIE = "admin_sesion";
export const DURACION = 60 * 60 * 24 * 7; // 7 días, en segundos

const enc = new TextEncoder();

function aB64u(buf: ArrayBuffer): string {
  let s = "";
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function deB64u(s: string): Uint8Array<ArrayBuffer> {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function llave(): Promise<CryptoKey | null> {
  const secreto = process.env.ADMIN_SESSION_SECRET;
  if (!secreto) return null;
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secreto),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function crearToken(): Promise<string> {
  const k = await llave();
  if (!k) throw new Error("falta ADMIN_SESSION_SECRET");
  const payload = String(Math.floor(Date.now() / 1000) + DURACION);
  const firma = await crypto.subtle.sign("HMAC", k, enc.encode(payload));
  return `${payload}.${aB64u(firma)}`;
}

export async function tokenValido(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const [payload, firma] = token.split(".");
  if (!payload || !firma) return false;
  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp < Date.now() / 1000) return false;
  const k = await llave();
  if (!k) return false;
  try {
    return await crypto.subtle.verify("HMAC", k, deB64u(firma), enc.encode(payload));
  } catch {
    return false;
  }
}
