import Link from "next/link";
import { telas } from "@/data/telas";
import { Tarjeta, Titulo } from "@/components/admin/ui";

export default function TelasPage() {
  return (
    <>
      <Titulo titulo="Telas" sub="Cada tela con sus colores disponibles" />
      <div className="space-y-3">
        {telas.map((t) => (
          <Link key={t.id} href={`/admin/telas/${t.id}`} className="block">
            <Tarjeta className="boton-tactil !p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-semibold text-bordo"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.nombre}
                  </p>
                  <p className="text-xs text-carbon/55">
                    {t.composicion} · {t.colores.length} colores
                  </p>
                </div>
                <span className="text-xl text-bronce">›</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.colores.slice(0, 14).map((c) => (
                  <span
                    key={c.codigo}
                    className="h-5 w-5 rounded-full border border-black/10"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
                {t.colores.length > 14 && (
                  <span className="self-center text-[11px] text-carbon/50">
                    +{t.colores.length - 14}
                  </span>
                )}
              </div>
            </Tarjeta>
          </Link>
        ))}
      </div>
    </>
  );
}
