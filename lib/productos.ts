export type Producto = {
  id: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  tipografia: string;
  colores: { nombre: string; hex: string; uso: string }[];
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
      { nombre: "Verde musgo", hex: "#4a5a3f", uso: "Camisa" },
      { nombre: "Hueso / arena", hex: "#c9b896", uso: "Corbata, falda y pantalón" },
    ],
    bulletsMujer: [
      "Camisa manga corta en telas Oxford, Fil a fil, Pic a pic, Dobi y Popelina brasilera con un bordado institucional",
      "Corbata en tela gabardina brasilera 100% algodón con un bordado institucional",
      "Falda en tela brasilera 100% algodón",
      "Polera en tela Piqué peruano con derecho a dos bordados institucionales",
    ],
    bulletsHombre: [
      "Camisa manga corta en telas Oxford, Fil a fil, Pic a pic, Dobi y Popelina brasilera con un bordado institucional",
      "Corbata en tela gabardina brasilera 100% algodón con un bordado institucional",
      "Pantalón en tela brasilera 100% algodón",
      "Polera en tela Piqué peruano con derecho a dos bordados institucionales",
    ],
    // TODO: reemplazar por fotos reales de "por dentro" y "por fuera" cuando esten disponibles
    fotoMujerDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_1.png",
    fotoMujerFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_1.png",
    fotoHombreDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_1.png",
    fotoHombreFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_1.png",
  },
];
