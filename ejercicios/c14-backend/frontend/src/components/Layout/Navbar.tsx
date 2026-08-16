import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import logoLibreria from '../../assets/img/logoLibreria.png'
import '../../assets/styles/App.css'

export default function Navbar() {
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
                <Link to='/libros/nuevo' className="nav-link">Agregar libro</Link>
            </div>
        </div>
    </nav>
  );
}