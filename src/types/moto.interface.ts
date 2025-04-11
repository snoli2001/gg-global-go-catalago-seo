export interface Color {
  modelo: string;
  color_id: number;
  hex1: string;
  hex2: string;
  name_color: string;
}

export interface Carrusel {
  idCarrusel: number;
  idModelo: number;
  imagen: string;
  type: "B" | "G";
  color_id: number;
}

export interface Moto {
  idModelo: number;
  modelo: string;
  rgb: string;
  precio: number;
  logo: string;
  marca: string;
  imagen: string;
  cilindrada: string;
  potencia: string;
  torque: string;
  combustible: string;
  tanque: string;
  rendimiento: string;
  autonomia: string;
  transmision: string;
  velocidad: string;
  suspension_delantero: string;
  suspension_posterior: string;
  peso: string;
  carga: string;
  largo: string;
  ancho: string;
  alto: string;
  texto: string;
  categoria: string;
  icono: string;
  freno_delantero: string;
  freno_posterior: string;
  modelIcon: string;
  colores: Color[];
  carrusels: Carrusel[];
  currency: "sol" | "dolar";
  video: string;
  code: string;
  price_dollar: number;
  fee_amount: number;
} 