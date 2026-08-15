"use client";

import { useState } from "react";
import Image from "next/image";

export default function FotoZoom({ src, alt }: { src: string; alt: string }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        aria-label={`Ampliar ${alt}`}
        className="absolute inset-0 w-full h-full"
      >
        <Image src={src} alt={alt} fill className="object-contain" />
      </button>

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
          />
        </div>
      )}
    </>
  );
}
