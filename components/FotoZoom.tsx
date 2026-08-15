"use client";

import { useState } from "react";
import Image from "next/image";

export default function FotoZoom({ src, alt }: { src: string; alt: string }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <div className="absolute inset-0 w-full h-full">
        <Image src={src} alt={alt} fill className="object-contain" />
        <button
          type="button"
          onClick={() => setAbierto(true)}
          aria-label={`Ampliar ${alt}`}
          className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-[var(--color-bordo)]/80 text-[var(--color-hueso)] flex items-center justify-center shadow-md"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>

      {abierto && (
        <div
          className="fixed inset-0 z-50 bg-white flex items-center justify-center p-6"
          onClick={() => setAbierto(false)}
        >
          <button
            type="button"
            onClick={() => setAbierto(false)}
            aria-label="Cerrar"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[var(--color-bordo)] text-[var(--color-hueso)] flex items-center justify-center text-lg shadow-md"
          >
            ✕
          </button>
          <Image
            src={src}
            alt={alt}
            width={800}
            height={1120}
            className="max-w-full max-h-full w-auto h-auto object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
