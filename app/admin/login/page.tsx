"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [clave, setClave] = useState("");
  const [ver, setVer] = useState(false);

  function entrar(e: React.FormEvent) {
    e.preventDefault();
    // Diseño: aún sin validación real (se conecta en el paso del login)
    router.push("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={entrar}
        className="w-full max-w-sm rounded-3xl border border-hueso/40 bg-papel p-7 shadow-2xl"
      >
        <div className="mb-5 flex flex-col items-center">
          <Image
            src="/alexanders-moda-logo.png"
            alt="Alexander's Moda"
            width={96}
            height={96}
            className="h-24 w-24 object-contain"
            priority
          />
          <h1
            className="mt-3 text-xl font-semibold text-bordo"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Panel de administración
          </h1>
          <p className="text-sm text-carbon/60">Ingresá para editar tu catálogo</p>
        </div>

        <div className="pespunte-hueso mb-5" />

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-carbon/70">
            Contraseña
          </span>
          <div className="relative">
            <input
              type={ver ? "text" : "password"}
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-bordo/20 bg-white px-3 py-3 pr-16 text-sm outline-none focus:border-bronce focus:ring-2 focus:ring-hueso/40"
            />
            <button
              type="button"
              onClick={() => setVer(!ver)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-bordo"
            >
              {ver ? "Ocultar" : "Ver"}
            </button>
          </div>
        </label>

        <button
          type="submit"
          className="boton-tactil mt-5 w-full rounded-full bg-bordo py-3 text-sm font-semibold text-hueso shadow-md"
        >
          Ingresar
        </button>
      </form>
    </main>
  );
}
