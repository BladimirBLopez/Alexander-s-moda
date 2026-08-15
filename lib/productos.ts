export type Producto = {
  id: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  tipografia: string;
  colores: { nombre: string; hex: string }[];
  bulletsMujer: string[];
  bulletsHombre: string[];
  fotoMujerDentro: string;
  fotoMujerFuera: string;
  fotoHombreDentro: string;
  fotoHombreFuera: string;
};

const PLACEHOLDER = (label: string) =>
  `https://placehold.co/500x700/511014/ddb779?text=${encodeURIComponent(label)}`;

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
    fotoMujerDentro: PLACEHOLDER("Mujer - camisa dentro"),
    fotoMujerFuera: PLACEHOLDER("Mujer - camisa fuera"),
    fotoHombreDentro: PLACEHOLDER("Hombre - camisa dentro"),
    fotoHombreFuera: PLACEHOLDER("Hombre - camisa fuera"),
  },
];
