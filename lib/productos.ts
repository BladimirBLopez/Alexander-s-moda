export type Producto = {
  id: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  tipografia: string;
  colores: { nombre: string; hex: string }[];
  bulletsMujer: string[];
  bulletsHombre: string[];
  fotoMujerDentro?: string;
  fotoMujerFuera?: string;
  fotoHombreDentro?: string;
  fotoHombreFuera?: string;
};

export const productos: Producto[] = [
  {
    id: "uniforme-promocion",
    nombre: "Uniforme de Promoción",
    subtitulo: "Diseño exclusivo a medida",
    descripcion: "Diseño exclusivo a medida para el curso de graduación.",
    tipografia: "A definir según diseño",
    colores: [
      { nombre: "Verde musgo", hex: "#4a5a3f" },
      { nombre: "Hueso / arena", hex: "#c9b896" },
    ],
    bulletsMujer: [
      "Camisa manga corta color a elección",
      "Corte femenino entallado",
      "Corbata con bordado de escudo propio",
      "Falda a juego",
    ],
    bulletsHombre: [
      "Camisa manga corta color a elección",
      "Corte clásico",
      "Corbata con bordado de escudo propio",
      "Pantalón a juego",
    ],
    // TODO: reemplazar por fotos reales de "por dentro" y "por fuera" cuando esten disponibles
    fotoMujerDentro: "/catalogo/promo-mujer.png",
    fotoMujerFuera: "/catalogo/promo-mujer.png",
    fotoHombreDentro: "/catalogo/promo-hombre.png",
    fotoHombreFuera: "/catalogo/promo-hombre.png",
  },
];
