import 'bootstrap/dist/css/bootstrap.min.css'
import { CatalogoInteractivo } from '../components/Catalogos.tsx';
import { BotonInicio } from '../components/Botones.tsx'
import { useLocation } from 'react-router-dom';
import '../assets/styles/App.css'

function CatalogoPag() {
  const location = useLocation();
  const nuevoLibro = location.state?.nuevoLibro;
  return (
    <main>
      <div className="container my-5 d-flex flex-column align-items-center gap-5">
        <h1 className="mt-5">Catálogo de libros</h1>
        <CatalogoInteractivo cant={30} nuevoLibro={nuevoLibro} />
        <BotonInicio />
      </div>
    </main>
  );
}

export default CatalogoPag;