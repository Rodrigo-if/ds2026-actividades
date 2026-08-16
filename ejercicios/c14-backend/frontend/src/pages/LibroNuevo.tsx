import LibroNuevoForm from "../components/LibroNuevoForm.tsx";
import type { LibroValidado } from "../schemas/libroSchema.ts";
import { BotonVolver } from "../components/Botones.tsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/styles/App.css'

function LibroNuevo({ onAgregar }: { onAgregar: (nuevo: LibroValidado) => void }) {
  return (
    <main>
        <div className="d-flex mt-5 flex-column">
        <h1 className="text-center mt-5 mb-0">Agregar nuevo libro</h1>
        <LibroNuevoForm onAgregar={onAgregar} />
        </div>
        <div className="d-flex me-auto p-3">
            <BotonVolver />
        </div>
    </main>
  );
}

export default LibroNuevo;
