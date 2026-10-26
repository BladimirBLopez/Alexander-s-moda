import type { Producto } from "@/lib/productos";
import type { Tela } from "@/data/telas";

export const productoVacio: Producto = {
  id: "",
  nombre: "",
  subtitulo: "",
  descripcion: "",
  tipografia: "",
  bulletsMujer: [""],
  bulletsHombre: [""],
};

export const telaVacia: Tela = {
  id: "",
  nombre: "",
  estructura: "",
  composicion: "",
  gramaje: "",
  ancho: "",
  caracteristicas: [],
  colores: [],
};
