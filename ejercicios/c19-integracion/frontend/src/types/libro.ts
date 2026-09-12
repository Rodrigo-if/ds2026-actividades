export type LibroCardProps = {
  title: string;
  author_name?: string[];
  cover_i?: string;
  keyLibro: string;
};

export interface Libro {
  id: number;
  titulo: string;
  autorId: number;
  precio: number;
  stock: number;
  imagenUrl?: string;
  resumen?: string;
  autor?: {
    id: number;
    nombre: string;
  };
}