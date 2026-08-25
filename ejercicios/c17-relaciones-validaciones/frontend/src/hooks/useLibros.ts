import { useFetch } from "./useFetch";
import type { LibroOL } from "../types/libroOL.ts";
import type { LibroCrudo } from "../types/libroCrudo.ts";

export function useLibros(query: string, n: number) {
  const { data, loading, error } = useFetch<{ docs: LibroCrudo[] }>(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
  );
  const libros: LibroOL[] =
    data?.docs.map((libro) => ({
      title: libro.title,
      author_name: libro.author_name?.map((a) =>
        typeof a === "string" ? a : a.name
      ) || [],
      cover_i:
        typeof libro.cover_i === "string"
          ? parseInt(libro.cover_i)
          : libro.cover_i,
      key: libro.key,
      precio: libro.precio,
      disponible: libro.disponible,
    })) ?? [];
  return { libros: libros.slice(0, n), loading, error };
}
