import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Card, Button, Container, Row, Col, Form, Toast, ToastContainer } from 'react-bootstrap'
import { Link, useParams, useLocation } from 'react-router-dom'
import { marked } from 'marked'
import { obtenerLibros, obtenerLibro } from '../services/metodos'
import type { LibroOL } from '../services/metodos'
import logoLibreria from '../assets/img/logoLibreria.png'
import guirnaldas from '../assets/img/guirnaldas.png'
import '../assets/styles/App.css'

//LibroCard
type LibroCardProps = {
  title: string;
  author_name?: string[];
  cover_i?: string;
  keyLibro: string;
}

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

//Botón para volver al inicio del catálogo
export function BotonInicio() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Button className="btn" id="botonInicio" onClick={handleClick}> Ir al principio </Button>
  );
}

//Detalle del libro
interface LibroDetalle {
  title: string;
  description?: { value?: string } | string;
  covers?: number[];
  cover_i: string;
  authors?: string[];
}

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

//Botón volver atrás
export function BotonVolver() {
  const handleClick = () => {
    history.back(); // vuelve a la página anterior
  };
  return (
    <Button className="btn" id="botonVolver" onClick={handleClick}> Volver </Button>
  );
}

//hero
export function Hero() {
  return (
    <div className="p-5 rounded-3 hero-bg">
        <div className="container-fluid py-5 hero-content">
            <h1 className="display-5 fw-bold">Bienvenido a la librería virtual</h1>
            <p className="col-md-8 fs-4">Explora nuestro catálogo de libros y encuentra tu próxima lectura favorita.</p>
            <Link to='/catalogo' className="btn btn-lg">Ver catálogo</Link>
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
                <Link to='/' className="nav-link active" aria-current="page">Inicio</Link>
                <Link to='/catalogo' className="nav-link">Catálogo</Link>
                <Link to='/contacto' className="nav-link">Contacto</Link>
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

//Formulario de contacto
export function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    asunto: "Consulta",
    mensaje: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [showToast, setShowToast] = useState(false);
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); //Para que se oculte solo a los 3 segundos
  };
  return (
    <div className="container my-0" style={{ maxWidth: "600px" }}>
      {/* Contenedor de Toast */}
      <ToastContainer position="top-center" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} autohide delay={3000} >
          <Toast.Body className="text-white"> Mensaje enviado correctamente </Toast.Body>
        </Toast>
      </ToastContainer>
      {/* Formulario */}
      <Form className="container my-5" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label className="d-flex me-auto">Nombre</Form.Label>
          <Form.Control type="text" name="nombre" id="nombreForm" value={formData.nombre} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="correo">
          <Form.Label className="d-flex me-auto">Correo electrónico</Form.Label>
          <Form.Control type="email" name="correo" id="mailForm" value={formData.correo} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="asunto">
          <Form.Label className="d-flex me-auto">Asunto</Form.Label>
          <Form.Select value={formData.asunto} onChange={handleChange} name="asunto" id="opcionForm" required>
            <option>Consulta</option>
            <option>Sugerencia</option>
            <option>Reclamo</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="mensaje">
          <Form.Label className="d-flex me-auto">Mensaje</Form.Label>
          <Form.Control as="textarea" rows={4} value={formData.mensaje} name="mensaje" id="mensajeForm" onChange={handleChange} required />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button type="submit" variant="primary">Aceptar</Button>
        </div>
      </Form>
    </div>
  );
}