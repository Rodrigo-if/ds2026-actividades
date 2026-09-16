import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Usuario, Rol, Credenciales } from '../types/sesionType';
import { apiFetch } from '../services/api';
import { obtenerToken, guardarToken, borrarToken } from '../services/sesion';

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState<boolean>(obtenerToken() !== null);

  const logout = () => {
    borrarToken();
    setUsuario(null);
  };

  const login = async (credenciales: Credenciales) => {
    const res = await apiFetch<{ token: string; usuario: Usuario }>('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciales),
    });
    guardarToken(res.token);
    setUsuario(res.usuario);
  };

  useEffect(() => {
    if (!obtenerToken()) return;
    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => borrarToken())
      .finally(() => setCargando(false));
  }, []);

  const estaAutenticado = usuario !== null;
  const tieneRol = (rol: Rol) => usuario?.rol === rol;

  return (
    <AuthContext.Provider value={{ usuario, cargando, estaAutenticado, tieneRol, login, logout }} >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };