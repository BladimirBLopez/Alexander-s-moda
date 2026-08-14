export type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  colores: { nombre: string; hex: string }[];
  bullets: string[];
  imagen: string; // TODO: reemplazar por foto real (Cloudinary) cuando el cliente la pase
};

export const productos: Producto[] = [
  {
    id: "uniforme-basico",
    nombre: "Uniforme Escolar Básico",
    descripcion: "Uniforme diario para colegio, a medida según diseño institucional.",
    colores: [
      { nombre: "Azul marino", hex: "#1e2a4a" },
      { nombre: "Blanco", hex: "#f7f1e6" },
    ],
    bullets: [
      "Camisa/blusa manga corta o larga",
      "Pantalón o falda según diseño",
      "Bordado de escudo institucional",
    ],
    imagen: "https://placehold.co/600x800/3d0c0f/e8d2a6?text=Foto+pendiente",
  },
  {
    id: "uniforme-promocion",
    nombre: "Uniforme de Promoción",
    descripcion: "Diseño exclusivo a medida para el curso de graduación.",
    colores: [
      { nombre: "Verde musgo", hex: "#4a5a3f" },
      { nombre: "Hueso / arena", hex: "#c9b896" },
    ],
    bullets: [
      "Camisa manga corta color a elección",
      "Corbata con bordado de escudo propio",
      "Tipografía personalizada en bordado",
    ],
    imagen: "https://placehold.co/600x800/3d0c0f/e8d2a6?text=Foto+pendiente",
  },
];
