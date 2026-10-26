import { cookies } from "next/headers";
import { COOKIE, tokenValido } from "@/lib/sesion";

export async function adminAutenticado(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE)?.value;
  return tokenValido(token);
}
