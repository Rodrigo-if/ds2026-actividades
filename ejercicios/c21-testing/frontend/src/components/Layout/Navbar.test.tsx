import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../../hooks/useAuth.ts";

vi.mock("../../hooks/useAuth.ts", () => ({
  useAuth: vi.fn(),
}));

describe("Componente Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el botón de Iniciar Sesión cuando el usuario no está autenticado", () => {
    vi.mocked(useAuth).mockReturnValue({
      estaAutenticado: false,
      cargando: false,
      usuario: null,
      login: vi.fn(),
      logout: vi.fn(),
      tieneRol: () => false,
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
    expect(screen.queryByText(/agregar libro/i)).not.toBeInTheDocument();
  });

  it("muestra la opción de Agregar libro y Cerrar Sesión si es ADMIN y está autenticado", async () => {
    const user = userEvent.setup();
    const mockLogout = vi.fn();

    vi.mocked(useAuth).mockReturnValue({
      estaAutenticado: true,
      cargando: false,
      usuario: { id: "1", nombre: "Admin", email: "admin@test.com", rol: "ADMIN" },
      login: vi.fn(),
      logout: mockLogout,
      tieneRol: (rol) => rol === "ADMIN",
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();
    expect(screen.getByText(/agregar libro/i)).toBeInTheDocument();

    const botonLogout = screen.getByText(/cerrar sesión/i);
    await user.click(botonLogout);

    expect(mockLogout).toHaveBeenCalled();
  });
});