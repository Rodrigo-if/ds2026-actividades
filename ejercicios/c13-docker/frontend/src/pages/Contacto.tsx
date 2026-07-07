import 'bootstrap/dist/css/bootstrap.min.css'
import { BotonVolver } from '../components/Botones.tsx';
import { FormularioContacto } from '../components/FormularioContacto.tsx'
import '../assets/styles/App.css'

function Contacto() {
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

export default Contacto;