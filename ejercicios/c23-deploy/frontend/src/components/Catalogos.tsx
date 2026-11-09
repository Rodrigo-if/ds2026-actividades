import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import '../assets/styles/App.css';
import type { LibroValidado } from '../schemas/libroSchema.ts';
import { LibroCard } from './LibroCard.tsx';
import { useLibros } from '../hooks/useLibros.ts';
import { Spinner, Alert } from 'react-bootstrap';
import type { Libro } from '../types/libro.ts';

// Catálogo de libros
export function Catalogo({ query, n, nuevoLibro }: { query: string; n: number; nuevoLibro?: LibroValidado }) {
  const { libros, loading, error } = useLibros(query, n);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center my-4">
        Error al cargar: {error}
      </Alert>
    );
  }

  // Si existe un nuevo libro recién agregado, se antepone al inicio
  const lista: Libro[] = nuevoLibro ? [nuevoLibro as unknown as Libro, ...libros] : libros;

  if (lista.length === 0) return <p className="text-center my-4">Sin resultados por ahora.</p>;

  return (
    <div className="d-flex flex-wrap justify-content-center gap-5">
      {lista.map((libro) => (
        <LibroCard
          key={libro.id}
          libro={libro}
        />
      ))}
    </div>
  );
}

// Catálogo de libros con input interactivo de búsqueda
export function CatalogoInteractivo({ cant, nuevoLibro }: { cant: number; nuevoLibro?: LibroValidado }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.trim().toLowerCase());
  };

  return (
    <main className="container">
      <input
        type="text"
        placeholder="Buscar libro por título o autor..."
        className="form-control mb-5 mx-auto w-50"
        id="busquedaCatalogo"
        onChange={handleInputChange}
      />
      <Catalogo query={query} n={cant} nuevoLibro={nuevoLibro} />
    </main>
  );
}