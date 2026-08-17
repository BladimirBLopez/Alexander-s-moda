export interface ColorTela {
  codigo: string;
  hex: string;
}

export interface Tela {
  id: string;
  nombre: string;
  estructura: string;
  composicion: string;
  gramaje: string;
  ancho: string;
  caracteristicas: string[]; // ej: ["Durabilidad", "Suave al Tacto", "Planchado Fácil", "Respirabilidad", "Liviano", "Protección UV 30"]
  colores: ColorTela[];
}

export const telas: Tela[] = [
  {
    id: "fill-a-fill-profesional",
    nombre: "Fill a Fill Profesional",
    estructura: "Tafeta 1x1",
    composicion: "35% Algodón Peinado / 65% Poliéster",
    gramaje: "149 grs/M²",
    ancho: "150 cm",
    caracteristicas: ["Durabilidad", "Suave al Tacto", "Planchado Fácil", "Secado Rápido", "Respirabilidad", "Liviano", "Protección UV 25"],
    colores: [
      { codigo: "6001", hex: "#e1dce1" },
      { codigo: "27", hex: "#bab2c0" },
      { codigo: "23", hex: "#a395a6" },
      { codigo: "22", hex: "#a7bdd2" },
      { codigo: "24", hex: "#828b9f" },
      { codigo: "28", hex: "#a6a89e" },
      { codigo: "29", hex: "#999d9b" },
      { codigo: "31", hex: "#be7686" },
      { codigo: "26", hex: "#ecc5d0" },
      { codigo: "01", hex: "#8bb499" },
      { codigo: "05", hex: "#4a5261" },
      { codigo: "8600", hex: "#20211d" },
      { codigo: "02", hex: "#c6ae87" },
      { codigo: "04", hex: "#df9d82" },
      { codigo: "30", hex: "#8bbbc0" },
      { codigo: "8506", hex: "#1c2a3f" },
      { codigo: "8402", hex: "#296148" },
      { codigo: "83L7", hex: "#ffffff" },
      { codigo: "85N3", hex: "#1a1d26" },
      { codigo: "83C1", hex: "#77868e" }
    ]
  },
  {
    id: "super-oxford-profesional",
    nombre: "Super Oxford Profesional",
    estructura: "Esterilla 2x1",
    composicion: "57% Algodón Peinado / 43% Poliéster",
    gramaje: "160 grs/M²",
    ancho: "160 cm",
    caracteristicas: ["Durabilidad", "Suave al Tacto", "Planchado Fácil", "Secado Rápido", "Respirabilidad", "Protección UV 30"],
    colores: [
      { codigo: "6001", hex: "#e5e0e6" },
      { codigo: "5700", hex: "#d3d3bb" },
      { codigo: "57V9", hex: "#b5ad8e" },
      { codigo: "5149", hex: "#eee496" },
      { codigo: "5165", hex: "#e5b291" },
      { codigo: "5250", hex: "#ebd7db" },
      { codigo: "5301", hex: "#c4c6d3" },
      { codigo: "5310", hex: "#aba4b7" },
      { codigo: "5432", hex: "#b6e0cf" },
      { codigo: "5414", hex: "#c7daa3" },
      { codigo: "5449", hex: "#949f89" },
      { codigo: "5348", hex: "#aac2d9" },
      { codigo: "5350", hex: "#8193ad" },
      { codigo: "8545", hex: "#313a54" },
      { codigo: "5703", hex: "#bbb9ac" },
      { codigo: "5600", hex: "#777976" },
      { codigo: "831C", hex: "#ffffff" },
      { codigo: "871B", hex: "#ffffff" },
      { codigo: "5264", hex: "#9d7a7e" },
      { codigo: "54W9", hex: "#93bb9d" },
      { codigo: "5228", hex: "#d57d83" },
      { codigo: "5856", hex: "#a6aba3" },
      { codigo: "8404", hex: "#ffffff" },
      { codigo: "8895", hex: "#35393c" },
      { codigo: "8600", hex: "#10110f" },
      { codigo: "83AC", hex: "#141b23" }
    ]
  },
  {
    id: "cristal-camisero",
    nombre: "Cristal Camisero",
    estructura: "Drill / Sarga 2x1",
    composicion: "100% Algodón",
    gramaje: "170 grs / 5 Onz/YD²",
    ancho: "170 cm",
    caracteristicas: ["Durabilidad", "Suave al Tacto", "Respirabilidad", "Liviano", "Protección UV 30", "OEKO-TEX Standard 100"],
    colores: [
      { codigo: "0002", hex: "#e6eaeb" },
      { codigo: "7029", hex: "#e7e0d1" },
      { codigo: "7271", hex: "#cfcebc" },
      { codigo: "8011", hex: "#beb6a5" },
      { codigo: "7263", hex: "#92816d" },
      { codigo: "3028", hex: "#dba54a" },
      { codigo: "1186", hex: "#ae1414" },
      { codigo: "5366", hex: "#6184b8" },
      { codigo: "5335", hex: "#142c64" },
      { codigo: "4029", hex: "#125f3d" },
      { codigo: "8120", hex: "#81837c" },
      { codigo: "5223", hex: "#0c0c0c" },
      { codigo: "0001", hex: "#0b0b0b" },
      { codigo: "5225", hex: "#adbbc8" },
      { codigo: "8087", hex: "#333726" },
      { codigo: "5362", hex: "#1d5a6a" },
      { codigo: "4084", hex: "#103120" },
      { codigo: "4283", hex: "#2c4e53" }
    ]
  },
  {
    id: "popelina-office",
    nombre: "Popelina Office",
    estructura: "Tela 1x1",
    composicion: "65% Algodón Peinado / 35% Poliéster",
    gramaje: "116 grs/M²",
    ancho: "160 cm",
    caracteristicas: ["Durabilidad", "Suave al Tacto", "Respirabilidad", "Liviano", "Protección UV 25"],
    colores: [
      { codigo: "8266", hex: "#4c141b" },
      { codigo: "84D0", hex: "#19291e" },
      { codigo: "8141", hex: "#eccb86" },
      { codigo: "8342", hex: "#314050" },
      { codigo: "8501", hex: "#191c21" },
      { codigo: "8219", hex: "#ebd2d8" },
      { codigo: "8858", hex: "#80939c" },
      { codigo: "83L6", hex: "#253c6d" },
      { codigo: "8600", hex: "#161614" },
      { codigo: "8238", hex: "#c21920" },
      { codigo: "5104", hex: "#ebe9db" },
      { codigo: "6001", hex: "#e7e5e8" },
      { codigo: "8367", hex: "#bfd7e3" },
      { codigo: "8362", hex: "#425e88" },
      { codigo: "8310", hex: "#9a9b96" },
      { codigo: "X69", hex: "#82a187" },
      { codigo: "6110", hex: "#aca18d" },
      { codigo: "8162", hex: "#3b3f41" },
      { codigo: "704", hex: "#8e7058" },
      { codigo: "8401", hex: "#397f58" },
      { codigo: "81T0", hex: "#d48466" },
      { codigo: "83L7", hex: "#369496" }
    ]
  },
  {
    id: "pik-a-pik-office",
    nombre: "Pik a Pik Office",
    estructura: "Tafeta 1x1",
    composicion: "48% Algodón Peinado / 52% Poliéster",
    gramaje: "105 grs/M²",
    ancho: "150 cm",
    caracteristicas: ["Durabilidad", "Suave al Tacto", "Planchado Fácil", "Respirabilidad", "Liviano", "Protección UV 25"],
    colores: [
      { codigo: "19", hex: "#d4d1c0" },
      { codigo: "10", hex: "#c23d43" },
      { codigo: "06", hex: "#7c6a83" },
      { codigo: "04", hex: "#e9b8c4" },
      { codigo: "16", hex: "#7fb584" },
      { codigo: "03", hex: "#93afc6" },
      { codigo: "01", hex: "#4f658d" },
      { codigo: "15", hex: "#757c75" },
      { codigo: "25", hex: "#252928" },
      { codigo: "13", hex: "#978976" },
      { codigo: "26", hex: "#4d1315" },
      { codigo: "27", hex: "#192135" },
      { codigo: "12", hex: "#8f8daa" },
      { codigo: "24", hex: "#74b3c9" },
      { codigo: "22", hex: "#dd8683" },
      { codigo: "17", hex: "#e4b8a4" }
    ]
  }
];
