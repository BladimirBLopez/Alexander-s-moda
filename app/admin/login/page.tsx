import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function login(formData: FormData) {
  "use server";

  const usuario = formData.get("usuario");
  const contrasena = formData.get("contrasena");

  const usuarioOk = usuario === process.env.ADMIN_USER;
  const contrasenaOk = contrasena === process.env.ADMIN_PASSWORD;

  if (usuarioOk && contrasenaOk) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", process.env.ADMIN_SESSION_SECRET ?? "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect("/admin");
  }

  redirect("/admin/login?error=1");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-papel)] px-6">
      <form
        action={login}
        className="w-full max-w-xs flex flex-col gap-4 border border-[var(--color-hueso)]/50 rounded-xl p-6 bg-white"
      >
        <h1
          className="text-xl uppercase tracking-wide text-center mb-2"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "var(--color-bordo)",
          }}
        >
          Panel Admin
        </h1>

        {error && (
          <p className="text-red-600 text-xs text-center">
            Usuario o contraseña incorrectos.
          </p>
        )}

        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          required
          className="border border-[var(--color-hueso)]/50 rounded-lg px-3 py-2 text-sm"
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          required
          className="border border-[var(--color-hueso)]/50 rounded-lg px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-[var(--color-bordo)] text-white rounded-lg py-2 text-sm font-semibold uppercase tracking-wide"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
