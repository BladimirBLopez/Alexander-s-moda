import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getProformaActual } from "@/lib/proforma";
import IconoAdmin, {
  type IconoAdminNombre,
} from "@/components/admin/IconoAdmin";

export const dynamic = "force-dynamic";

export default async function InicioPanel() {
  const [uniformes, telas, proforma] = await Promise.all([
    prisma.producto.findMany({
      select: { id: true, nombre: true },
      orderBy: { orden: "asc" },
    }),
    prisma.tela.findMany({
      select: { colores: true },
      orderBy: { orden: "asc" },
    }),
    getProformaActual(),
  ]);

  const totalColores = telas.reduce(
    (total, tela) =>
      total +
      (Array.isArray(tela.colores) ? tela.colores.length : 0),
    0
  );

  const estadoProforma =
    proforma.pdfUrl === "/proforma.pdf"
      ? "Original"
      : "Actualizada";

  const resumen: {
    titulo: string;
    valor: string | number;
    detalle: string;
    href: string;
    icono: IconoAdminNombre;
  }[] = [
    {
      titulo: "Uniformes",
      valor: uniformes.length,
      detalle: "En el catálogo",
      href: "/admin/uniformes",
      icono: "uniformes",
    },
    {
      titulo: "Telas",
      valor: telas.length,
      detalle: "Materiales disponibles",
      href: "/admin/telas",
      icono: "telas",
    },
    {
      titulo: "Colores",
      valor: totalColores,
      detalle: "Opciones registradas",
      href: "/admin/telas",
      icono: "colores",
    },
    {
      titulo: "Proforma",
      valor: estadoProforma,
      detalle: "Documento de precios",
      href: "/admin/proforma",
      icono: "proforma",
    },
  ];

  const herramientas: {
    titulo: string;
    descripcion: string;
    href: string;
    icono: IconoAdminNombre;
  }[] = [
    {
      titulo: "Fotografías",
      descripcion: "Gestionar imágenes del catálogo",
      href: "/admin/fotos",
      icono: "fotos",
    },
    {
      titulo: "Proforma",
      descripcion: "Consultar o actualizar el PDF de precios",
      href: "/admin/proforma",
      icono: "proforma",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[28px] border border-bordo/10 bg-white px-5 py-6 shadow-[0_12px_38px_-30px_rgba(75,18,25,0.45)] sm:px-8 sm:py-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-hueso/55 blur-3xl"
        />

        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-bronce/20 bg-papel px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-bordo">
            <IconoAdmin nombre="brillo" className="h-3.5 w-3.5" />
            Panel de administración
          </div>

          <h1
            className="max-w-xl text-[30px] font-semibold leading-tight text-bordo sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tu tienda, bajo control.
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-carbon/60">
            Gestioná los uniformes, sus descripciones, fotografías
            y materiales desde un solo lugar.
          </p>

          <Link
            href="/admin/uniformes"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-bordo px-4 text-xs font-semibold text-hueso shadow-sm transition hover:bg-bordo-oscuro"
          >
            <IconoAdmin nombre="editar" className="h-4 w-4" />
            Editar uniformes
            <IconoAdmin nombre="flecha" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="titulo-resumen">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-bronce">
              Vista general
            </p>
            <h2
              id="titulo-resumen"
              className="mt-1 text-xl font-semibold text-bordo"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Resumen de la tienda
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {resumen.map((item) => (
            <Link
              key={item.titulo}
              href={item.href}
              className="group rounded-2xl border border-bordo/10 bg-white p-4 shadow-[0_3px_14px_rgba(70,35,30,0.035)] transition hover:-translate-y-0.5 hover:border-bronce/40 hover:shadow-md sm:p-5"
            >
              <div className="mb-5 flex items-start justify-between gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-papel text-bordo">
                  <IconoAdmin nombre={item.icono} className="h-5 w-5" />
                </span>
                <IconoAdmin
                  nombre="externo"
                  className="h-4 w-4 text-bronce/60 transition group-hover:text-bordo"
                />
              </div>

              <p
                className="break-words text-[26px] font-semibold leading-tight text-bordo sm:text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.valor}
              </p>
              <p className="mt-2 text-xs font-semibold text-carbon/80">
                {item.titulo}
              </p>
              <p className="mt-1 text-[11px] leading-4 text-carbon/45">
                {item.detalle}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="titulo-uniformes">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-bronce">
              Catálogo
            </p>
            <h2
              id="titulo-uniformes"
              className="mt-1 text-xl font-semibold text-bordo"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Gestionar uniformes
            </h2>
          </div>

          <Link
            href="/admin/uniformes"
            className="text-xs font-semibold text-bordo underline-offset-4 hover:underline"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {uniformes.map((uniforme, indice) => (
            <Link
              key={uniforme.id}
              href={
                "/admin/uniformes/" +
                encodeURIComponent(uniforme.id)
              }
              className="group flex items-center gap-4 rounded-2xl border border-bordo/10 bg-white p-4 shadow-sm transition hover:border-bronce/40 hover:shadow-md sm:p-5"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-papel text-bordo">
                <IconoAdmin
                  nombre="uniformes"
                  className="h-7 w-7"
                />
              </span>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-bronce">
                  Uniforme {String(indice + 1).padStart(2, "0")}
                </p>
                <h3 className="text-base font-semibold text-bordo">
                  {uniforme.nombre}
                </h3>
                <p className="mt-1 text-xs text-carbon/55">
                  Editar descripciones e imágenes
                </p>
              </div>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bordo/10 text-bordo transition group-hover:bg-bordo group-hover:text-hueso">
                <IconoAdmin
                  nombre="flecha"
                  className="h-4 w-4"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="titulo-herramientas">
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-bronce">
            Administración
          </p>
          <h2
            id="titulo-herramientas"
            className="mt-1 text-xl font-semibold text-bordo"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Herramientas
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {herramientas.map((herramienta) => (
            <Link
              key={herramienta.href}
              href={herramienta.href}
              className="group flex items-center gap-3 rounded-2xl border border-bordo/10 bg-white p-4 transition hover:border-bronce/40 hover:shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-papel text-bordo">
                <IconoAdmin
                  nombre={herramienta.icono}
                  className="h-5 w-5"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-bordo">
                  {herramienta.titulo}
                </p>
                <p className="mt-1 text-xs text-carbon/50">
                  {herramienta.descripcion}
                </p>
              </div>
              <IconoAdmin
                nombre="flecha"
                className="h-4 w-4 text-bronce"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
