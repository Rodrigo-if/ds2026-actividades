export interface Libro {
  id: number;
  titulo: string;
  autorId: number;
  precio: number;
  imagen: string;
  disponible: boolean;
  autor?: {
    id: number;
    nombre: string;
    nacionalidad?: string;
  };
  categorias?: {
    id: number;
    nombre: string;
  }[];
}

export interface LibroCardProps {
  libro: Libro;
}