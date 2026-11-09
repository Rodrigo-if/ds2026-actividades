import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/styles/App.css';
import type { LibroCardProps } from '../types/libro.ts';

export function LibroCard({ libro }: LibroCardProps) {
  if (!libro) return null;

  const nombreAutor =
    typeof libro.autor === 'object' && libro.autor !== null
      ? libro.autor.nombre
      : libro.autor || 'Autor desconocido';

  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80';

  const imagenUrl = libro.imagen || libro.imagen || DEFAULT_IMAGE;

  return (
    <Card className="card" style={{ width: "18rem" }}>
      <Card.Body className="d-flex flex-column gap-3">
        <img
          src={imagenUrl}
          className="card-img-top"
          alt={`Portada de ${libro.titulo}`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
        <Card.Title className="card-title">{libro.titulo}</Card.Title>
        <Card.Text className="card-text">{nombreAutor}</Card.Text>
        <div className="mt-auto d-flex justify-content-end">
          <Link to={`/detalle-libro/${libro.id}`} className="btn">
            Ver más
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}