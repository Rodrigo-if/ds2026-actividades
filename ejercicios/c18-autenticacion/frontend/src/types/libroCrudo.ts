interface LibroCrudo {
  title: string;
  author_name?: (string | { name: string })[];
  cover_i?: number | string;
  key: string;
  precio?: number;
  disponible?: "disponible" | "no disponible";
}

export type { LibroCrudo };