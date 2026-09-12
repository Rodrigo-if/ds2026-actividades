import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../assets/styles/App.css'
import type { LibroCardProps } from '../types/libro.ts'

export function LibroCard({ keyLibro, title, author_name, cover_i }: LibroCardProps) {
  return (
    <Card className="card" style={{ width: "18rem" }}>
      <Card.Body className="d-flex flex-column gap-3">
        <img src={cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : 'placeholder.jpg'} className="card-img-top" alt="Portada del libro" />
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-text">
          {author_name ? author_name.join(", ") : "Autor desconocido"}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-end">
          <Link to={`/detalle-libro/${keyLibro.replace("/works/", "")}`} state={{cover_i}} className="btn">Ver más</Link>
        </div>
      </Card.Body>
    </Card>
  );
}