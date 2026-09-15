import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../services/api';
import type { Libro } from '../types/libro';
import '../assets/styles/App.css';

export function InfoLibro() {
  const { id } = useParams<{ id: string }>();
  const [libro, setLibro] = useState<Libro | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLibro() {
      try {
        setLoading(true);
        setError(null);
        const data = await apiFetch<Libro>(`/libros/${id}`);
        setLibro(data);
      } catch (err) {
        setError((err as Error).message || 'Error al obtener el detalle del libro');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchLibro();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando detalles...</span>
        </Spinner>
      </div>
    );
  }

  if (error || !libro) {
    return (
      <Alert variant="danger" className="text-center my-5">
        {error || 'No se encontró información del libro.'}
      </Alert>
    );
  }

  const nombreAutor = libro.autor?.nombre || 'Autor desconocido';
  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80';

  return (
    <Container className="mt-5 detalles-libro">
      <Row className="align-items-start">
        <Col md={4} className="d-flex justify-content-center">
          <img
            src={libro.imagen || DEFAULT_IMAGE}
            alt={`Portada de ${libro.titulo}`}
            className="rounded shadow-sm w-100"
            style={{ 
              maxHeight: '420px', 
              objectFit: 'cover', 
              aspectRatio: '3/4' 
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_IMAGE;
            }}
          />
        </Col>
        <Col md={8} className="position-relative d-flex flex-column align-items-start pt-2 pe-4 text-white">
          <h1>{libro.titulo}</h1>
          <h3 className="text-muted">{nombreAutor}</h3>
          <h4 className="mt-2 text-success">Precio: ${libro.precio}</h4>
          <span className="mt-1 badge bg-info">
            {libro.disponible ? 'Disponible' : 'Sin stock'}
          </span>
          <p className="mt-4 text-justify">
            Sin descripción disponible para este libro.
          </p>
        </Col>
      </Row>
    </Container>
  );
}