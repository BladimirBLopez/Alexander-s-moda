import type { ReactNode } from "react";

export type IconoAdminNombre =
  | "inicio"
  | "uniformes"
  | "telas"
  | "colores"
  | "fotos"
  | "proforma"
  | "flecha"
  | "externo"
  | "editar"
  | "brillo";

const dibujos: Record<IconoAdminNombre, ReactNode> = {
  inicio: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  uniformes: (
    <>
      <path d="m8 3-5 3-1 5 4 2 2-3v11h8V10l2 3 4-2-1-5-5-3" />
      <path d="M8 3a4 4 0 0 0 8 0" />
    </>
  ),
  telas: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  colores: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="9" r="1" />
      <circle cx="14" cy="7" r="1" />
      <circle cx="17" cy="12" r="1" />
      <path d="M12 21a3 3 0 0 1-3-3 3 3 0 0 1 3-3h2a2 2 0 0 0 2-2" />
    </>
  ),
  fotos: (
    <>
      <rect x="3" y="3" width="15" height="15" rx="2" />
      <circle cx="8" cy="8" r="1.5" />
      <path d="m3 15 5-5 4 4 2-2 4 4" />
      <path d="M9 21h10a2 2 0 0 0 2-2V9" />
    </>
  ),
  proforma: (
    <>
      <path d="M6 2h8l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" />
      <path d="M14 2v6h5M9 13h6M9 17h6" />
    </>
  ),
  flecha: <path d="m9 18 6-6-6-6" />,
  externo: <path d="M7 17 17 7M8 7h9v9" />,
  editar: (
    <>
      <path d="m15 5 4 4M4 20l4-.8L20 7a2.8 2.8 0 0 0-4-4L4 15l-.8 4A1 1 0 0 0 4 20Z" />
    </>
  ),
  brillo: (
    <>
      <path d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z" />
      <path d="m19 18 .6 1.4L21 20l-1.4.6L19 22l-.6-1.4L17 20l1.4-.6L19 18Z" />
    </>
  ),
};

export default function IconoAdmin({
  nombre,
  className = "",
}: {
  nombre: IconoAdminNombre;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {dibujos[nombre]}
    </svg>
  );
}
