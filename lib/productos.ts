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
  fotoMujerDentroZoom?: string;
  fotoMujerFueraZoom?: string;
  fotoHombreDentroZoom?: string;
  fotoHombreFueraZoom?: string;
  fotoSeccion2ArribaZoom?: string;
  fotoSeccion2IzquierdaZoom?: string;
  fotoSeccion2DerechaZoom?: string;
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
    fotoMujerDentroZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792943540/IMG-20261025-WA0008_u7sgwq.jpg",
    fotoMujerFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893479/20260908_145019_0000_ixf8gc.png",
    fotoMujerFueraZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792932216/IMG-20261025-WA0018_qfouq4.jpg",
    fotoHombreDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788898948/20260908_161917_0000_p8zf8h.png",
    fotoHombreDentroZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792943610/IMG-20261025-WA0006_ztugmr.jpg",
    fotoHombreFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788898949/20260908_162045_0000_lzhsth.png",
    fotoHombreFueraZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792943611/IMG-20261025-WA0019_tujvar.jpg",
    fotoSeccion2Arriba: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788903170/20260908_172812_0000_sjlh5a.png",
    fotoSeccion2ArribaZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792943706/IMG-20261025-WA0014_n2tdgv.jpg",
    fotoSeccion2Izquierda: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788903170/20260908_172935_0000_ubf4mh.png",
    fotoSeccion2IzquierdaZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792943707/IMG-20261025-WA0010_ywcgu0.jpg",
    fotoSeccion2Derecha: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788909513/20260908_191726_0000_tah9ov.png",
    fotoSeccion2DerechaZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792943713/IMG-20261025-WA0016_cqtuqa.jpg",
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
    fotoMujerDentroZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792943931/IMG-20261025-WA0007_fceqzm.jpg",
    fotoMujerFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893478/20260908_144638_0000_ovkxne.png",
    fotoMujerFueraZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792943930/IMG-20261025-WA0011_myr19u.jpg",
    fotoHombreDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788911852/Dise%C3%B1o_sin_t%C3%ADtulo_20260908_195643_0000_riujoc.png",
    fotoHombreDentroZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792943999/IMG-20261025-WA0017_z66qes.jpg",
    fotoHombreFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788899900/20260908_163618_0000_z7jbyg.png",
    fotoHombreFueraZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792943999/IMG-20261025-WA0015_cux1kb.jpg",
    fotoSeccion2Arriba: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788910438/20260908_193254_0000_uvkkoh.png",
    fotoSeccion2ArribaZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792944110/IMG-20261025-WA0013_xm9jsg.jpg",
    fotoSeccion2Izquierda: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788903743/20260908_173713_0000_pjkpj8.png",
    fotoSeccion2IzquierdaZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792944232/IMG-20261025-WA0009_kdbjkb.jpg",
    fotoSeccion2Derecha: "https://res.cloudinary.com/dkq95jus0/image/upload/v1788908701/New_ilzrqt.png",
    fotoSeccion2DerechaZoom: "https://res.cloudinary.com/dkq95jus0/image/upload/v1792944160/IMG-20261025-WA0012_mtpxgh.jpg",
  },
];
