import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import logoLibreria from '../../assets/img/logoLibreria.png'
import '../../assets/styles/App.css'
import { useAuth } from '../../hooks/useAuth.ts'
import { Offcanvas } from 'bootstrap'

type BootstrapOffcanvasInstance = {
  hide: () => void;
};

type BootstrapLike = {
  Offcanvas: {
    getInstance: (element: Element | null) => BootstrapOffcanvasInstance | null;
    getOrCreateInstance: (element: Element | null) => BootstrapOffcanvasInstance;
    new (element: HTMLElement): BootstrapOffcanvasInstance;
  };
};

declare global {
  interface Window {
    bootstrap?: BootstrapLike;
  }
}

export default function Navbar() {
    const navigate = useNavigate();
    const { estaAutenticado, logout, tieneRol } = useAuth();

    const hideOffcanvas = () => {
        const offcanvasElement = document.getElementById('offcanvasNavbar');
        if (!offcanvasElement) return;
        const instance = Offcanvas.getOrCreateInstance(offcanvasElement);
        instance.hide();
    };

    // Función para limpiar la sombra y el bloqueo de scroll del body de forma segura
    const cleanupBackdrop = () => {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.querySelectorAll('.offcanvas-backdrop').forEach((backdrop) => backdrop.remove());
    };

    const handleNavClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        to: string
    ) => {
        event.preventDefault();
        const offcanvasElement = document.getElementById('offcanvasNavbar');
        if (!offcanvasElement) {
            navigate(to);
            return;
        }

        offcanvasElement.addEventListener(
            'hidden.bs.offcanvas',
            () => {
                cleanupBackdrop(); // Borra la sombra y libera el body
                navigate(to);      // Navega a la nueva ruta
            },
            { once: true }
        );
        hideOffcanvas();
    };

    const handleLogout = () => {
        const offcanvasElement = document.getElementById('offcanvasNavbar');
        if (!offcanvasElement) {
            logout();
            navigate('/login');
            return;
        }

        offcanvasElement.addEventListener(
            'hidden.bs.offcanvas',
            () => {
                cleanupBackdrop(); // Borra la sombra y libera el body
                logout();
                navigate('/login');
            },
            { once: true }
        );
        hideOffcanvas();
    };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-bg">
          <div className="container-fluid">
              {/* Logo y título a la izquierda */}
              <Link className="navbar-brand d-flex align-items-center me-4" to="/">
                  <img src={logoLibreria} width="65" height="65" className="d-inline-block align-text-center me-2"/>
                  Librería virtual
              </Link>

              {/* Botón hamburguesa */}
              <button 
                  className="navbar-toggler" 
                  type="button" 
                  data-bs-toggle="offcanvas" 
                  data-bs-target="#offcanvasNavbar" 
                  aria-controls="offcanvasNavbar" 
                  aria-label="Toggle navigation"
              >
                  <span className="navbar-toggler-icon"></span>
              </button>

              {/* Menú de PC (Horizontal) */}
              <div className="collapse navbar-collapse d-none d-lg-flex justify-content-between" id="navbarNavDesktop">
                  <div className="navbar-nav mb-2 mb-lg-0 navbar-links">
                      <Link to='/' className="nav-link active" aria-current="page">Inicio</Link>
                      <Link to='/catalogo' className="nav-link">Catálogo</Link>
                      <Link to='/contacto' className="nav-link">Contacto</Link>
                      {tieneRol('ADMIN') && (
                        <Link to='/libros/nuevo' className="nav-link">Agregar libro</Link>
                      )}
                  </div>

                  <div className="d-flex ms-auto">
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
          </div>
      </nav>

      {/* Menú lateral Offcanvas FUERA del nav para romper el encierro de capas */}
      <div className="offcanvas offcanvas-end sidebar-mobile text-bg-dark" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header border-bottom border-secondary">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
              <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          
          <div className="offcanvas-body d-flex flex-column justify-content-between py-4">
              <div className="navbar-nav gap-3 fs-5">
                  <Link to='/' className="nav-link active" onClick={(e) => handleNavClick(e, '/')}>Inicio</Link>
                  <Link to='/catalogo' className="nav-link" onClick={(e) => handleNavClick(e, '/catalogo')}>Catálogo</Link>
                  <Link to='/contacto' className="nav-link" onClick={(e) => handleNavClick(e, '/contacto')}>Contacto</Link>
                  {tieneRol('ADMIN') && (
                    <Link to='/libros/nuevo' className="nav-link" onClick={(e) => handleNavClick(e, '/libros/nuevo')}>
                        Agregar libro
                    </Link>
                  )}
              </div>

              <div className="mt-auto pt-3">
                  {estaAutenticado ? (
                      <button onClick={handleLogout} className="btn w-100 py-2">
                          Cerrar Sesión
                      </button>
                  ) : (
                      <Link to="/login" className="btn text-decoration-none w-100 text-center py-2" onClick={(e) => handleNavClick(e, '/login')}>
                          Iniciar Sesión
                      </Link>
                  )}
              </div>
          </div>
      </div>
    </>
  );
}