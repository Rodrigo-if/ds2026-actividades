import 'bootstrap/dist/css/bootstrap.min.css'
import { InfoLibro } from '../components/DetalleLibro.tsx'
import { BotonVolver } from '../components/Botones.tsx';
import '../assets/styles/App.css'

function DetalleLibro() {
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

export default DetalleLibro;