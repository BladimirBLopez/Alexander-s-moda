"use client";

import type { BulletItem } from "@/lib/productos";
import {
  BotonIcono,
  BotonSecundario,
  Campo,
  inputCls,
} from "@/components/admin/ui";

export default function BulletsEditor({
  items,
  onChange,
}: {
  items: BulletItem[];
  onChange: (items: BulletItem[]) => void;
}) {
  const poner = (i: number, v: BulletItem) =>
    onChange(items.map((x, k) => (k === i ? v : x)));
  const quitar = (i: number) => onChange(items.filter((_, k) => k !== i));
  const mover = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const copia = [...items];
    [copia[i], copia[j]] = [copia[j], copia[i]];
    onChange(copia);
  };

  return (
    <div className="space-y-2.5">
      {items.map((it, i) => (
        <div
          key={i}
          className="rounded-xl border border-bordo/10 bg-papel/60 p-2.5"
        >
          <div className="flex items-start gap-2">
            <span className="mt-2.5 text-bronce">•</span>
            <div className="min-w-0 flex-1 space-y-2">
              {typeof it === "string" ? (
                <textarea
                  rows={2}
                  value={it}
                  onChange={(e) => poner(i, e.target.value)}
                  className={inputCls}
                />
              ) : (
                <>
                  <input
                    value={it.texto}
                    onChange={(e) => poner(i, { ...it, texto: e.target.value })}
                    className={inputCls}
                  />
                  <Campo label="Opciones (una por línea)">
                    <textarea
                      rows={Math.min(6, Math.max(3, it.sublista.length))}
                      value={it.sublista.join("\n")}
                      onChange={(e) =>
                        poner(i, { ...it, sublista: e.target.value.split("\n") })
                      }
                      className={inputCls}
                    />
                  </Campo>
                  <Campo label="Nota (opcional)">
                    <input
                      value={it.nota ?? ""}
                      onChange={(e) =>
                        poner(i, { ...it, nota: e.target.value || undefined })
                      }
                      className={inputCls}
                    />
                  </Campo>
                </>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <BotonIcono label="Subir" onClick={() => mover(i, -1)} disabled={i === 0}>
                ↑
              </BotonIcono>
              <BotonIcono
                label="Bajar"
                onClick={() => mover(i, 1)}
                disabled={i === items.length - 1}
              >
                ↓
              </BotonIcono>
              <BotonIcono label="Quitar" onClick={() => quitar(i)}>
                ✕
              </BotonIcono>
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-2 pt-1">
        <BotonSecundario onClick={() => onChange([...items, ""])}>
          + Punto simple
        </BotonSecundario>
        <BotonSecundario
          onClick={() => onChange([...items, { texto: "", sublista: [""] }])}
        >
          + Punto con opciones
        </BotonSecundario>
      </div>
    </div>
  );
}
