import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import type { Rol } from '../types/sesionType';

interface RutaProtegidaProps {
  rolRequerido?: Rol;
}

export default function RutaProtegida({ rolRequerido }: RutaProtegidaProps) {
  const { estaAutenticado, cargando, tieneRol } = useAuth();

  // Si la sesión todavía se está verificando al recargar la página
  if (cargando) {
    return <div className="text-center my-5">Cargando sesión...</div>;
  }

  // Si no está autenticado, redirige al login
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere un rol específico y no lo cumple, redirige al inicio
  if (rolRequerido && !tieneRol(rolRequerido)) {
    return <Navigate to="/" replace />;
  }

  // Si supera las validaciones, renderiza la ruta hija
  return <Outlet />;
}