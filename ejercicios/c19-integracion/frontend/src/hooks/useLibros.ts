import { useState, useEffect } from "react";
import type { Libro } from "../types/libro";
import { apiFetch } from "../services/api";

export function useLibros() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargarLibros() {
      try {
        setLoading(true);
        setError(null);
        // Llamada a la API real del backend
        const data = await apiFetch<Libro[]>("/libros");
        if (!cancelado) {
          setLibros(data);
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
  }, []);

  return { libros, loading, error };
}