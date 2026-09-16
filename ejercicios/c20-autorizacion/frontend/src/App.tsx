import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout.tsx';
import Home from './pages/Home.tsx';
import CatalogoPag from './pages/Catalogo.tsx';
import Contacto from './pages/Contacto.tsx';
import DetalleLibro from "./pages/Detalle.tsx";
import LibroNuevo from "./pages/LibroNuevo.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RutaProtegida from "./components/RutaProtegida.tsx";
import { useState } from 'react';
import type { LibroValidado } from "./schemas/libroSchema.ts";
import librosIniciales from './services/librosIniciales.ts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/App.css';

function App() {
  const [libros, setLibros] = useState<LibroValidado[]>(librosIniciales);
  const agregarLibro = (nuevo: LibroValidado) => { setLibros([nuevo, ...libros]); };
  
  return (
    <Layout>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalogo" element={<CatalogoPag />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/detalle-libro/:id/*" element={<DetalleLibro />} />

        {/* Ruta protegida solo para rol ADMIN */}
        <Route element={<RutaProtegida rolRequerido="ADMIN" />}>
          <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;