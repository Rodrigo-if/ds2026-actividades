import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RutaProtegida from "./RutaProtegida";
import { useAuth } from "../hooks/useAuth";

vi.mock("../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("Componente RutaProtegida", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el mensaje de carga si la sesión se está verificando", () => {
    vi.mocked(useAuth).mockReturnValue({
      usuario: null,
      cargando: true,
      estaAutenticado: false,
      login: vi.fn(),
      logout: vi.fn(),
      tieneRol: () => false,
    });

    render(
      <MemoryRouter>
        <RutaProtegida />
      </MemoryRouter>
    );

    expect(screen.getByText(/cargando sesión.../i)).toBeInTheDocument();
  });

  it("redirige al login si el usuario no está autenticado", () => {
    vi.mocked(useAuth).mockReturnValue({
      usuario: null,
      cargando: false,
      estaAutenticado: false,
      login: vi.fn(),
      logout: vi.fn(),
      tieneRol: () => false,
    });

    render(
      <MemoryRouter initialEntries={["/privado"]}>
        <Routes>
          <Route path="/login" element={<div>Página de Login</div>} />
          <Route element={<RutaProtegida />}>
            <Route path="/privado" element={<div>Panel Privado</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Página de Login")).toBeInTheDocument();
  });

  it("permite el acceso a la ruta protegida si está autenticado y cumple el rol requerido", () => {
    vi.mocked(useAuth).mockReturnValue({
      usuario: { id: "1", email: "admin@test.com", nombre: "Admin", rol: "ADMIN" },
      cargando: false,
      estaAutenticado: true,
      login: vi.fn(),
      logout: vi.fn(),
      tieneRol: (rol) => rol === "ADMIN",
    });

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route path="/" element={<div>Inicio</div>} />
          <Route element={<RutaProtegida rolRequerido="ADMIN" />}>
            <Route path="/admin" element={<div>Panel de Administración</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Panel de Administración")).toBeInTheDocument();
  });
});