import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import '../assets/styles/App.css'
import type { LibroValidado } from '../schemas/libroSchema.ts'
import { LibroCard } from './LibroCard.tsx'
import { useLibros } from '../hooks/useLibros.ts'
import { Spinner, Alert } from 'react-bootstrap'

//Catálogo de libros
export function Catalogo({ query, n, nuevoLibro }: { query: string; n: number; nuevoLibro?: LibroValidado }) {
  const { libros, loading, error } = useLibros(query, n);
  if (loading) return <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>;
  if (error) return (
      <Alert variant="danger" className="text-center my-4">
        Error al cargar: {error}
      </Alert>
    );;
  const lista = nuevoLibro ? [nuevoLibro, ...libros] : libros;
  if (lista.length === 0) return <p>Sin resultados por ahora.</p>;
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