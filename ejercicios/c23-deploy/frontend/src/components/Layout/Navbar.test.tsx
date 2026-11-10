import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
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

    // Mock global de Bootstrap para JSDOM
    Object.assign(window, {
      bootstrap: {
        Offcanvas: {
          getInstance: vi.fn().mockReturnValue({ hide: vi.fn() }),
          getOrCreateInstance: vi.fn().mockReturnValue({ hide: vi.fn() }),
        },
      },
    });
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

    // Como existen dos elementos (escritorio y mobile), verificamos que haya al menos uno disponible
    const botonesLogin = screen.getAllByText(/iniciar sesión/i);
    expect(botonesLogin.length).toBeGreaterThan(0);
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

    const botonesLogout = screen.getAllByText(/cerrar sesión/i);
    const opcionesAgregarLibro = screen.getAllByText(/agregar libro/i);

    expect(botonesLogout.length).toBeGreaterThan(0);
    expect(opcionesAgregarLibro.length).toBeGreaterThan(0);

    // Clickeamos el botón de escritorio (el primero)
    await user.click(botonesLogout[0]);

    // Disparamos el evento para liberar la navegación en el offcanvas si hizo falta
    const offcanvasElement = document.getElementById("offcanvasNavbar");
    if (offcanvasElement) {
      fireEvent(offcanvasElement, new Event("hidden.bs.offcanvas"));
    }

    expect(mockLogout).toHaveBeenCalled();
  });
});