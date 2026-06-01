import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { obtenerLibros } from '../services/metodos.ts'
import '../assets/styles/App.css'
import type { LibroOL } from '../types/libroOL.ts'
import { LibroCard } from './LibroCard.tsx'

//Catálogo de libros
export function Catalogo({ query, n }: { query: string; n: number }) {
  const [libros, setLibros] = useState<LibroOL[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLibros() {
      setLoading(true);
      const resultados = await obtenerLibros(query);
      setLibros(resultados.slice(0, n));
      setLoading(false);
    }
    fetchLibros();
  }, [query, n]);

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
export function CatalogoInteractivo({cant}:{cant: number}) {
  const [query, setQuery] = useState("bestseller");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.trim().toLowerCase();
    setQuery(valor === "" ? "bestseller" : valor);
  };
  return (
    <main className="container">
      <input type="text" placeholder="Buscar libro..." className="form-control mb-5 mx-auto w-50" id="busquedaCatalogo" onChange={handleInputChange} />
      <Catalogo query={query} n={cant} />
    </main>
  );
}