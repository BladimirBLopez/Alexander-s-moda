import Link from "next/link";
import { productos } from "@/lib/productos";
import { telas } from "@/data/telas";
import { Tarjeta, Titulo } from "@/components/admin/ui";

export default function InicioPanel() {
  const totalColores = telas.reduce((n, t) => n + t.colores.length, 0);

  const stats = [
    { label: "Uniformes", valor: productos.length, href: "/admin/uniformes" },
    { label: "Telas", valor: telas.length, href: "/admin/telas" },
    { label: "Colores", valor: totalColores, href: "/admin/telas" },
    { label: "Proforma", valor: "Activa", href: "/admin/proforma" },
  ];

  const accesos = [
    { t: "Editar uniforme Sport", d: "Textos, bullets y telas incluidas", h: "/admin/uniformes/uniforme-sport" },
    { t: "Editar uniforme Casimir", d: "Textos, bullets y telas incluidas", h: "/admin/uniformes/uniforme-casimir" },
    { t: "Cambiar fotos", d: "Subí nuevas fotos del catálogo", h: "/admin/fotos" },
    { t: "Actualizar proforma", d: "Reemplazá el PDF de precios", h: "/admin/proforma" },
  ];

  return (
    <>
      <Titulo titulo="Hola, Alexander 👋" sub="¿Qué querés actualizar hoy?" />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Tarjeta className="boton-tactil text-center">
              <p
                className="text-2xl font-semibold text-bordo"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.valor}
              </p>
              <p className="text-xs uppercase tracking-wider text-carbon/50">
                {s.label}
              </p>
            </Tarjeta>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-bronce">
        Accesos rápidos
      </h2>
      <div className="space-y-2">
        {accesos.map((a) => (
          <Link key={a.h} href={a.h} className="block">
            <Tarjeta className="boton-tactil flex items-center justify-between !p-4">
              <div>
                <p className="text-sm font-semibold text-bordo">{a.t}</p>
                <p className="text-xs text-carbon/55">{a.d}</p>
              </div>
              <span className="text-bronce">›</span>
            </Tarjeta>
          </Link>
        ))}
      </div>
    </>
  );
}
