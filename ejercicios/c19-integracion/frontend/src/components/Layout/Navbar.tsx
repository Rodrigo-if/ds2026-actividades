import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import logoLibreria from '../../assets/img/logoLibreria.png'
import '../../assets/styles/App.css'
import { obtenerToken, borrarToken } from '../../services/sesion'

export default function Navbar() {
  const navigate = useNavigate();
  const estaAutenticado = !!obtenerToken();

  const handleLogout = () => {
    borrarToken();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-bg">
        <div className="container-fluid d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <Link className="navbar-brand d-flex align-items-center me-4" to="/">
                    <img src={logoLibreria} width="65" height="65" className="d-inline-block align-text-center me-2"/>
                    Librería virtual
                </Link>
                <div className="navbar-nav mb-lg-0 navbar-links">
                    <Link to='/' className="nav-link active" aria-current="page">Inicio</Link>
                    <Link to='/catalogo' className="nav-link">Catálogo</Link>
                    <Link to='/contacto' className="nav-link">Contacto</Link>
                    {estaAutenticado && (
                      <Link to='/libros/nuevo' className="nav-link">Agregar libro</Link>
                    )}
                </div>
            </div>

            <div className="ms-auto">
                {estaAutenticado ? (
                    <button onClick={handleLogout} className="btn">
                        Cerrar Sesión
                    </button>
                ) : (
                    <Link to="/login" className="btn text-decoration-none">
                        Iniciar Sesión
                    </Link>
                )}
            </div>
        </div>
    </nav>
  );
}