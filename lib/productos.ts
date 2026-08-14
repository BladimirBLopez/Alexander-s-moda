export type Producto = {
  id: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  tipografia: string;
  colores: { nombre: string; hex: string }[];
  bullets: string[];
  fotoMujer: string; // TODO: reemplazar por foto real (Cloudinary)
  fotoHombre: string; // TODO: reemplazar por foto real (Cloudinary)
};

export const productos: Producto[] = [
  {
    id: "uniforme-basico",
    nombre: "Uniforme Escolar Básico",
    subtitulo: "Uso diario",
    descripcion: "Uniforme diario para colegio, a medida según diseño institucional.",
    tipografia: "Times New Roman",
    colores: [
      { nombre: "Azul marino", hex: "#1e2a4a" },
      { nombre: "Blanco", hex: "#f7f1e6" },
    ],
    bullets: [
      "Camisa/blusa manga corta o larga",
      "Pantalón o falda según diseño",
      "Bordado de escudo institucional",
    ],
    fotoMujer: "https://placehold.co/500x700/3d0c0f/e8d2a6?text=Foto+mujer",
    fotoHombre: "https://placehold.co/500x700/3d0c0f/e8d2a6?text=Foto+hombre",
  },
  {
    id: "uniforme-promocion",
    nombre: "Uniforme de Promoción",
    subtitulo: "Diseño exclusivo 2027",
    descripcion: "Diseño exclusivo a medida para el curso de graduación.",
    tipografia: "Cursive Letters",
    colores: [
      { nombre: "Verde musgo", hex: "#4a5a3f" },
      { nombre: "Hueso / arena", hex: "#c9b896" },
    ],
    bullets: [
      "Camisa manga corta color a elección",
      "Corbata con bordado de escudo propio",
      "Tipografía personalizada en bordado",
    ],
    fotoMujer: "https://placehold.co/500x700/3d0c0f/e8d2a6?text=Foto+mujer",
    fotoHombre: "https://placehold.co/500x700/3d0c0f/e8d2a6?text=Foto+hombre",
  },
];
