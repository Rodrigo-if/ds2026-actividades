import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams, useLocation } from 'react-router-dom'
import { marked } from 'marked'
import { obtenerLibro } from '../services/metodos'
import '../assets/styles/App.css'
import type { LibroDetalle } from '../types/libroDetalle'

export function InfoLibro() {
  const { id } = useParams();
  const [libro, setLibro] = useState<LibroDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  async function fetchLibro() {
    setLoading(true);
    const data = await obtenerLibro(id!);
    setLibro(data);
    setLoading(false);
  }
  fetchLibro();
  }, [id]);
  const location = useLocation();
  if (loading) return <p className="mt-5 mb-0">Cargando detalles...</p>;
  if (!libro) return <p className="mt-5 mb-0">No se encontró información del libro.</p>;
  const cover_i = location.state?.cover_i;
  const portadaUrl = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : libro.cover_i ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg` : "placeholder.jpg";
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = "placeholder.jpg"; };
  const descripcion = typeof libro.description === "string" ? libro.description : libro.description?.value || "Sin descripción disponible";
  return (
    <Container className="mt-5 detalles-libro">
      <Row>
        <Col md={4}>
          <img src={portadaUrl} alt="" className="img-fluid rounded shadow-sm" onError={handleImageError}/>
        </Col>
        <Col md={8} className="position-relative d-flex flex-column align-items-start pt-2 pe-4">
          <h1>{libro.title}</h1>
          <h3>{libro.authors?.join(", ") || "Autor desconocido"}</h3>
          <p className="mt-3 text-justify" dangerouslySetInnerHTML={{ __html: marked.parse(descripcion) }}></p>
        </Col>
      </Row>
    </Container>
  );
}