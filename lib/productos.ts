export type Producto = {
  id: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  tipografia: string;
  bulletsMujer: string[];
  bulletsHombre: string[];
  fotoMujerDentro?: string;
  fotoMujerFuera?: string;
  fotoHombreDentro?: string;
  fotoHombreFuera?: string;
  fotoMujerSeccion2?: string;
  fotoHombreSeccion2?: string;
};

export const productos: Producto[] = [
  {
    id: "uniforme-sport",
    nombre: "Sport",
    subtitulo: "Tela Milano Flex 100% algodón",
    descripcion: "Diseño exclusivo a medida para el curso de graduación.",
    tipografia: "A definir según diseño",
    bulletsMujer: [
      "Falda en tela Milano Flex 100% algodón",
      "Camisa manga corta en tela Oxford con un bordado institucional",
      "Polera en tela Piqué peruano con derecho a dos bordados institucionales",
      "Corbata en tela Milano Flex 100% algodón con un bordado institucional",
    ],
    bulletsHombre: [
      "Pantalón en tela Milano Flex 100% algodón",
      "Camisa manga corta en tela Oxford con un bordado institucional",
      "Polera en tela Piqué peruano con derecho a dos bordados institucionales",
      "Corbata en tela Milano Flex 100% algodón con un bordado institucional",
    ],
    // TODO: reemplazar por fotos reales de "por dentro" y "por fuera" cuando esten disponibles
    fotoMujerDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_1.png",
    fotoMujerFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_1.png",
    fotoHombreDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_1.png",
    fotoHombreFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_1.png",
    fotoMujerSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_2.png",
    fotoHombreSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_2.png",
  },
  {
    id: "uniforme-casimir",
    nombre: "Casimir",
    subtitulo: "Tela Casimir Inglés",
    descripcion: "Diseño exclusivo a medida para el curso de graduación.",
    tipografia: "A definir según diseño",
    bulletsMujer: [
      "Falda en tela Casimir Inglés",
      "Camisa manga corta en tela Oxford con un bordado institucional",
      "Polera en tela Piqué peruano con derecho a dos bordados institucionales",
      "Corbata en tela Casimir Inglés con un bordado institucional",
    ],
    bulletsHombre: [
      "Pantalón en tela Casimir Inglés",
      "Camisa manga corta en tela Oxford con un bordado institucional",
      "Polera en tela Piqué peruano con derecho a dos bordados institucionales",
      "Corbata en tela Casimir Inglés con un bordado institucional",
    ],
    // TODO: reemplazar por fotos reales de "por dentro" y "por fuera" cuando esten disponibles
    fotoMujerDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_1.png",
    fotoMujerFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_1.png",
    fotoHombreDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_1.png",
    fotoHombreFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_1.png",
    fotoMujerSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_2.png",
    fotoHombreSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_2.png",
  },
];
