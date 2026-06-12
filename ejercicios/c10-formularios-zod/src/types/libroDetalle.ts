export interface LibroDetalle {
  title: string;
  description?: { value?: string } | string;
  covers?: number[];
  cover_i: string;
  authors?: string[];
}