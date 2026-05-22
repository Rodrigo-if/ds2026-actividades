/*import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'*/
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import {Card, Button} from 'react-bootstrap'
import { obtenerLibros } from '../services/metodos'
import type { LibroOL } from '../services/metodos'
import logoLibreria from '../img/logoLibreria.png'
import guirnaldas from '../img/guirnaldas.png'
import '../App.css'

//LibroCard
type LibroCardProps = {
  title: string;
  author_name?: string[];
  cover_i?: string;
}

export function LibroCard({ title, author_name, cover_i }: LibroCardProps) {
  return (
    <Card className="card" style={{ width: "18rem" }}>
      <Card.Body className="d-flex flex-column gap-3">
        <img src={cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : 'placeholder.jpg'} className="card-img-top" alt="Portada del libro" />
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-text">
          {author_name ? author_name.join(", ") : "Autor desconocido"}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-end">
          <Button className="btn">Ver más</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

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
          title={libro.title}
          author_name={libro.author_name}
          cover_i={libro.cover_i?.toString()}
        />
      ))}
    </div>
  );
}

//hero
export function Hero() {
  return (
    <div className="p-5 rounded-3 hero-bg">
        <div className="container-fluid py-5 hero-content">
            <h1 className="display-5 fw-bold">Bienvenido a la librería virtual</h1>
            <p className="col-md-8 fs-4">Explora nuestro catálogo de libros y encuentra tu próxima lectura favorita.</p>
            <Button className="btn btn-lg">Ver catálogo</Button>
        </div>
    </div>
  );
}

//navbar
export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-bg">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">
                <img src={logoLibreria} width="65" height="65" className="d-inline-block align-text-center"/>
                Librería virtual
            </a>
            <div className="navbar-nav me-auto mb-lg-0 navbar-links">
                <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                <a className="nav-link" href="#">Catálogo</a>
                <a className="nav-link" href="#">Contacto</a>
            </div>
        </div>
    </nav>
  );
}

//guirnaldas
export function Guirnaldas() {
  return (
    <div className="decoracion-guirnaldas">
        <img src={guirnaldas} alt="Decoración"/>
    </div>
  );
}