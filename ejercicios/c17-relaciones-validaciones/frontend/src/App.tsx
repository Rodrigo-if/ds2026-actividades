import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout.tsx';
import Home from './pages/Home.tsx'
import CatalogoPag from './pages/Catalogo.tsx'
import Contacto from './pages/Contacto.tsx';
import DetalleLibro from "./pages/Detalle.tsx";
import LibroNuevo from "./pages/LibroNuevo.tsx";
import { useState } from 'react';
import type { LibroValidado } from "./schemas/libroSchema.ts";
import librosIniciales from './services/librosIniciales.ts';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/App.css'

function App() {
  const [libros, setLibros] = useState<LibroValidado[]>(librosIniciales);
  const agregarLibro = (nuevo: LibroValidado) => { setLibros([nuevo, ...libros])};
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
        {/* Página de libro nuevo */}
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      </Routes>
    </Layout>
  );
}

export default App;
