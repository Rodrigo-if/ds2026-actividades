import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout.tsx';
import Home from './pages/Home.tsx'
import CatalogoPag from './pages/Catalogo.tsx'
import Contacto from './pages/Contacto.tsx';
import DetalleLibro from "./pages/Detalle.tsx";
import './assets/styles/App.css'

function App() {
  return (
    <Layout>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />
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
