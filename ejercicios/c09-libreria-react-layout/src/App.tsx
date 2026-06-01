import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout.tsx';
import { Inicio, CatalogoPag, Contacto, DetalleLibro } from "./pages/páginas";
import './assets/styles/App.css'

function App() {
  return (
    <Layout>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Inicio />} />
        {/* Página de catálogo */}
        <Route path="/catalogo" element={<CatalogoPag />} />
        {/* Página de contacto */}
        <Route path="/contacto" element={<Contacto />} />
        {/* Página de detalle */}
        <Route path="/detalle-libro/:id/*" element={<DetalleLibro />} />
      </Routes>
    </Layout>
  );
}

export default App;
