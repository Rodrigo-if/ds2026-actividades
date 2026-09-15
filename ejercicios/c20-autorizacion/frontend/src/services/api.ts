import { obtenerToken } from "./sesion";

// Si la variable de entorno es undefined, usa localhost:3000 por defecto
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiFetch<T>(
  ruta: string,
  opciones: RequestInit = {}
): Promise<T> {
  const token = obtenerToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...opciones.headers,
  };

  const endpoint = ruta.startsWith("/") ? ruta : `/${ruta}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...opciones,
    headers,
  });

  const cuerpo = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}