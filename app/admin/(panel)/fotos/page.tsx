import { productos, type Producto } from "@/lib/productos";
import FotoSlot from "@/components/admin/FotoSlot";
import { SeccionTitulo, Tarjeta, Titulo } from "@/components/admin/ui";

const SLOTS: { campo: keyof Producto; etiqueta: string }[] = [
  { campo: "fotoMujerDentro", etiqueta: "Dama · dentro" },
  { campo: "fotoMujerFuera", etiqueta: "Dama · fuera" },
  { campo: "fotoHombreDentro", etiqueta: "Varón · dentro" },
  { campo: "fotoHombreFuera", etiqueta: "Varón · fuera" },
  { campo: "fotoSeccion2Arriba", etiqueta: "Sección 2 · arriba" },
  { campo: "fotoSeccion2Izquierda", etiqueta: "Sección 2 · izquierda" },
  { campo: "fotoSeccion2Derecha", etiqueta: "Sección 2 · derecha" },
];

export default function FotosPage() {
  return (
    <>
      <Titulo
        titulo="Fotos"
        sub="Tocá una foto para reemplazarla. Se sube a Cloudinary."
      />
      <div className="space-y-5">
        {productos.map((p) => (
          <Tarjeta key={p.id}>
            <SeccionTitulo>Uniforme {p.nombre}</SeccionTitulo>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {SLOTS.map((s) => (
                <FotoSlot
                  key={s.campo}
                  etiqueta={s.etiqueta}
                  src={p[s.campo] as string | undefined}
                />
              ))}
            </div>
          </Tarjeta>
        ))}
      </div>
    </>
  );
}
