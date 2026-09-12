import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import '../assets/styles/App.css'

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