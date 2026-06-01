import 'bootstrap/dist/css/bootstrap.min.css'
import { Catalogo, Hero, CatalogoInteractivo, BotonInicio, InfoLibro, FormularioContacto, BotonVolver } from '../components/componentes'
import '../assets/styles/App.css'

export function Inicio() {
  return (
    <main>
      <Hero />
      <div className="container my-5 d-flex flex-column align-items-center gap-5">
        <h1>Libros destacados</h1>
        <Catalogo query="bestseller" n={6} />
      </div>
    </main>
  );
}

export function CatalogoPag() {
  return (
    <main>
      <div className="container my-5 d-flex flex-column align-items-center gap-5">
        <h1 className="mt-5">Catálogo de libros</h1>
        <CatalogoInteractivo cant={30} />
        <BotonInicio />
      </div>
    </main>
  );
}

export function Contacto() {
  return (
    <main>
      <div className="d-flex mt-5 flex-column">
        <h1 className="mt-5 mb-0">Contacto</h1>
        <FormularioContacto />
      </div>
      <div className="d-flex me-auto p-3">
        <BotonVolver />
      </div>
    </main>
  );
}

export function DetalleLibro() {
  return (
    <main>
      <div className="d-flex mt-5 mb-0 flex-column">
        <InfoLibro />
      </div>
      <div className="d-flex me-auto p-3 flex-row">
        <BotonVolver />
      </div>
    </main>
  );
}