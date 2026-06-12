import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { obtenerLibros } from '../services/metodos.ts'
import '../assets/styles/App.css'
import type { LibroOL } from '../types/libroOL.ts'
import type { LibroValidado } from '../schemas/libroSchema.ts'
import { LibroCard } from './LibroCard.tsx'
import { mapToLibroOL } from '../services/metodos.ts'

//Catálogo de libros
export function Catalogo({ query, n, nuevoLibro }: { query: string; n: number; nuevoLibro?: LibroValidado }) {
  const [libros, setLibros] = useState<LibroOL[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLibros() {
      setLoading(true);
      const resultados = await obtenerLibros(query);
      const lista = nuevoLibro ? [mapToLibroOL(nuevoLibro), ...resultados]: resultados;
      setLibros(lista.slice(0, n));
      setLoading(false);
    }
    fetchLibros();
  }, [query, n, nuevoLibro]);

  if (loading) return <p>Cargando...</p>;
  if (libros.length === 0) return <p>Sin resultados por ahora.</p>;

  return (
    <div className="d-flex flex-wrap justify-content-center gap-5">
      {libros.map((libro, index) => (
        <LibroCard
          key={index}
          keyLibro={libro.key}
          title={libro.title}
          author_name={libro.author_name}
          cover_i={libro.cover_i?.toString()}
        />
      ))}
    </div>
  );
}

//Catálogo de libros + input
export function CatalogoInteractivo({cant, nuevoLibro}:{cant: number; nuevoLibro?: LibroValidado}) {
  const [query, setQuery] = useState("bestseller");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.trim().toLowerCase();
    setQuery(valor === "" ? "bestseller" : valor);
  };
  return (
    <main className="container">
      <input type="text" placeholder="Buscar libro..." className="form-control mb-5 mx-auto w-50" id="busquedaCatalogo" onChange={handleInputChange} />
      <Catalogo query={query} n={cant} nuevoLibro={nuevoLibro} />
    </main>
  );
}