import type { ButtonHTMLAttributes, ReactNode } from "react";

export const inputCls =
  "w-full rounded-lg border border-bordo/20 bg-white px-3 py-2.5 text-sm text-carbon outline-none transition placeholder:text-carbon/30 focus:border-bronce focus:ring-2 focus:ring-hueso/40";

export function Titulo({
  titulo,
  sub,
  accion,
}: {
  titulo: string;
  sub?: string;
  accion?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3">
      <div>
        <h1
          className="text-2xl font-semibold text-bordo"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {titulo}
        </h1>
        {sub && <p className="mt-0.5 text-sm text-carbon/60">{sub}</p>}
      </div>
      {accion}
    </div>
  );
}

export function Tarjeta({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-bordo/10 bg-white p-4 shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}

export function SeccionTitulo({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-bronce">
      {children}
    </h2>
  );
}

export function Campo({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-carbon/70">
        {label}
      </span>
      {children}
    </label>
  );
}

type BotonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function BotonPrimario({ className = "", ...p }: BotonProps) {
  return (
    <button
      type="button"
      {...p}
      className={`boton-tactil rounded-full bg-bordo px-5 py-2.5 text-sm font-semibold text-hueso shadow-md disabled:opacity-40 ${className}`}
    />
  );
}

export function BotonSecundario({ className = "", ...p }: BotonProps) {
  return (
    <button
      type="button"
      {...p}
      className={`boton-tactil rounded-full border border-bordo/25 bg-white px-4 py-2 text-sm font-medium text-bordo disabled:opacity-40 ${className}`}
    />
  );
}

export function BotonIcono({
  label,
  className = "",
  ...p
}: BotonProps & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      {...p}
      className={`boton-tactil flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bordo/15 bg-papel text-sm text-bordo disabled:opacity-30 ${className}`}
    />
  );
}

export function BarraGuardar({
  sucio,
  onGuardar,
  etiqueta = "Guardar",
}: {
  sucio: boolean;
  onGuardar: () => void;
  etiqueta?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-[68px] z-30 px-4 md:bottom-4 md:left-60">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full border border-bordo/15 bg-white/95 py-2 pl-5 pr-2 shadow-lg backdrop-blur">
        <span className="text-xs text-carbon/60">
          {sucio ? "Tenés cambios sin guardar" : "Sin cambios"}
        </span>
        <BotonPrimario disabled={!sucio} onClick={onGuardar}>
          {etiqueta}
        </BotonPrimario>
      </div>
    </div>
  );
}

export function Pestanas<T extends string>({
  valor,
  opciones,
  onCambiar,
}: {
  valor: T;
  opciones: { id: T; label: string }[];
  onCambiar: (v: T) => void;
}) {
  return (
    <div className="mb-4 flex rounded-full bg-bordo/10 p-1">
      {opciones.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onCambiar(o.id)}
          className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
            valor === o.id ? "bg-bordo text-hueso shadow" : "text-bordo/70"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export const botonLinkCls =
  "boton-tactil rounded-full bg-bordo px-4 py-2 text-sm font-semibold text-hueso shadow-md";
