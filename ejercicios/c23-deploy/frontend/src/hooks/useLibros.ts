import { useState, useEffect } from "react";
import type { Libro } from "../types/libro";
import { apiFetch } from "../services/api";

export function useLibros(query: string = "", limit?: number) {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargarLibros() {
      try {
        setLoading(true);
        setError(null);
        
        // Llamada al endpoint real del backend Express/Prisma
        const data = await apiFetch<Libro[]>("/libros");
        
        if (!cancelado) {
          let resultado = data;
          
          // Filtrado por título o autor si existe una búsqueda
          if (query && query.trim() !== "") {
            const q = query.toLowerCase();
            resultado = resultado.filter((libro) => {
              const tituloMatch = libro.titulo?.toLowerCase().includes(q);
              const autorNombre = typeof libro.autor === 'object' ? libro.autor?.nombre : libro.autor;
              const autorMatch = autorNombre?.toLowerCase().includes(q);
              return tituloMatch || autorMatch;
            });
          }

          // Aplicación de límite de elementos a mostrar
          if (limit && limit > 0) {
            resultado = resultado.slice(0, limit);
          }

          setLibros(resultado);
        }
      } catch (err) {
        if (!cancelado) {
          setError((err as Error).message || "Error al cargar los libros");
        }
      } finally {
        if (!cancelado) {
          setLoading(false);
        }
      }
    }

    cargarLibros();

    return () => {
      cancelado = true;
    };
  }, [query, limit]);

  return { libros, loading, error };
}