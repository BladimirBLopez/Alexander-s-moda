export type BulletItem =
  | string
  | {
      texto: string;
      sublista: string[];
      nota?: string;
    };

export type Producto = {
  id: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  tipografia: string;
  bulletsMujer: BulletItem[];
  bulletsHombre: BulletItem[];
  fotoMujerDentro?: string;
  fotoMujerFuera?: string;
  fotoHombreDentro?: string;
  fotoHombreFuera?: string;
  fotoSeccion2Arriba?: string;
  fotoSeccion2Izquierda?: string;
  fotoSeccion2Derecha?: string;
};

const OPCIONES_TELA_CAMISA = ["Oxford Sport", "Oxford", "Fill a Fill", "Popelina Premium", "Doby", "Pik a Pik"];

export const productos: Producto[] = [
  {
    id: "uniforme-sport",
    nombre: "Sport",
    subtitulo: "Tela Milano Flex 100% algodón",
    descripcion: "Diseño exclusivo a medida para el curso de graduación.",
    tipografia: "A elección de los estudiantes de la promoción",
    bulletsMujer: [
      "Falda en tela Twill Flex 100% algodón (Gabardina Brasilera)",
      {
        texto: "Camisa manga corta con tela a elección:",
        sublista: OPCIONES_TELA_CAMISA,
        nota: "Con derecho a un bordado institucional",
      },
      "Polera en tela Piqué Peruano con derecho a dos bordados institucionales",
      "Corbata en tela Twill Flex 100% algodón con derecho a un bordado institucional",
    ],
    bulletsHombre: [
      "Pantalón en tela Twill Flex 100% algodón (Gabardina Brasilera)",
      {
        texto: "Camisa manga corta con tela a elección:",
        sublista: OPCIONES_TELA_CAMISA,
        nota: "Con derecho a un bordado institucional",
      },
      "Polera en tela Piqué Peruano con derecho a dos bordados institucionales",
      "Corbata en tela Twill Flex 100% algodón con derecho a un bordado institucional",
    ],
    fotoMujerDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893478/20260908_144832_0000_soy77a.png",
    fotoMujerFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893479/20260908_145019_0000_ixf8gc.png",
    fotoHombreDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788898948/20260908_161917_0000_p8zf8h.png",
    fotoHombreFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788898949/20260908_162045_0000_lzhsth.png",
    fotoSeccion2Arriba: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788903170/20260908_172812_0000_sjlh5a.png",
    fotoSeccion2Izquierda: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788903170/20260908_172935_0000_ubf4mh.png",
    fotoSeccion2Derecha: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788909513/20260908_191726_0000_tah9ov.png",
  },
  {
    id: "uniforme-casimir",
    nombre: "Casimir",
    subtitulo: "Tela Casimir Inglés",
    descripcion: "Diseño exclusivo a medida para el curso de graduación.",
    tipografia: "A elección de los estudiantes de la promoción",
    bulletsMujer: [
      "Falda en tela Casimir Inglés",
      {
        texto: "Camisa manga corta con tela a elección:",
        sublista: OPCIONES_TELA_CAMISA,
        nota: "Con derecho a un bordado institucional",
      },
      "Polera en tela Piqué Peruano con derecho a dos bordados institucionales",
      "Corbata en tela Casimir Inglés con un bordado institucional",
    ],
    bulletsHombre: [
      "Pantalón en tela Casimir Inglés",
      {
        texto: "Camisa manga corta con tela a elección:",
        sublista: OPCIONES_TELA_CAMISA,
        nota: "Con derecho a un bordado institucional",
      },
      "Polera en tela Piqué Peruano con derecho a dos bordados institucionales",
      "Corbata en tela Casimir Inglés con un bordado institucional",
    ],
    fotoMujerDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788911036/20260908_194209_0000_fc3xe0.png",
    fotoMujerFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893478/20260908_144638_0000_ovkxne.png",
    fotoHombreDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788911852/Dise%C3%B1o_sin_t%C3%ADtulo_20260908_195643_0000_riujoc.png",
    fotoHombreFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788899900/20260908_163618_0000_z7jbyg.png",
    fotoSeccion2Arriba: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788910438/20260908_193254_0000_uvkkoh.png",
    fotoSeccion2Izquierda: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788903743/20260908_173713_0000_pjkpj8.png",
    fotoSeccion2Derecha: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788908701/New_ilzrqt.png",
  },
];
