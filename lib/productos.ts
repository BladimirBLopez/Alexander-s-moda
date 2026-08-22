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
  fotoMujerSeccion2?: string;
  fotoHombreSeccion2?: string;
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
      "Falda en tela Twill Flex 100% algodón (Gabardina brasilera)",
      {
        texto: "Camisa manga corta con tela a elección:",
        sublista: OPCIONES_TELA_CAMISA,
        nota: "Con derecho a 1 bordado institucional",
      },
      "Polera en tela Piqué Peruano con derecho a 2 bordados institucionales",
      "Corbata en tela Twill Flex 100% algodón con derecho a 1 bordado institucional",
    ],
    bulletsHombre: [
      "Pantalón en tela Twill Flex 100% algodón (Gabardina brasilera)",
      {
        texto: "Camisa manga corta con tela a elección:",
        sublista: OPCIONES_TELA_CAMISA,
        nota: "Con derecho a 1 bordado institucional",
      },
      "Polera en tela Piqué Peruano con derecho a 2 bordados institucionales",
      "Corbata en tela Twill Flex 100% algodón con derecho a 1 bordado institucional",
    ],
    fotoMujerDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1787398877/Camisa_1_e97kgv.png",
    fotoMujerFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/e_gen_recolor:prompt_polo%20shirt%20fabric%20excluding%20white%20trim%20on%20collar%20and%20cuffs;to-color_222419/e_background_removal/v1787398877/Polera_1_rqsmxm.png",
    fotoHombreDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1787400132/Camisa_varon_1_hgxr9l.png",
    fotoHombreFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/c_pad,w_1000,h_1400,b_auto/e_gen_recolor:prompt_polo%20shirt%20fabric%20excluding%20white%20trim%20on%20collar%20and%20cuffs;to-color_222419/e_background_removal/v1787417201/Polera_varon_fl6v4l.png",
    fotoMujerSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_2_ywe8v4.png",
    fotoHombreSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_4_ys77im.png",
  },
  {
    id: "uniforme-casimir",
    nombre: "Casimir",
    subtitulo: "Tela Casimir Inglés",
    descripcion: "Diseño exclusivo a medida para el curso de graduación.",
    tipografia: "A elección de los estudiantes de la promoción",
    bulletsMujer: [
      "Falda en tela Casimir Inglés",
      "Camisa manga corta en tela Oxford con un bordado institucional",
      "Polera en tela Piqué Peruano con derecho a dos bordados institucionales",
      "Corbata en tela Casimir Inglés con un bordado institucional",
    ],
    bulletsHombre: [
      "Pantalón en tela Casimir Inglés",
      "Camisa manga corta en tela Oxford con un bordado institucional",
      "Polera en tela Piqué Peruano con derecho a dos bordados institucionales",
      "Corbata en tela Casimir Inglés con un bordado institucional",
    ],
    fotoMujerDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1787398877/Camisa_1_e97kgv.png",
    fotoMujerFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/e_gen_recolor:prompt_polo%20shirt%20fabric%20excluding%20white%20trim%20on%20collar%20and%20cuffs;to-color_222419/e_background_removal/v1787398877/Polera_1_rqsmxm.png",
    fotoHombreDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1787400132/Camisa_varon_1_hgxr9l.png",
    fotoHombreFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/c_pad,w_1000,h_1400,b_auto/e_gen_recolor:prompt_polo%20shirt%20fabric%20excluding%20white%20trim%20on%20collar%20and%20cuffs;to-color_222419/e_background_removal/v1787417201/Polera_varon_fl6v4l.png",
    fotoMujerSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_2.png",
    fotoHombreSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_2.png",
  },
];
