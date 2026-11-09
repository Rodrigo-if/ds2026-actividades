import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

// Mock de useAuth ya que Navbar se renderiza dentro de Layout
vi.mock("../../hooks/useAuth.ts", () => ({
  useAuth: () => ({
    estaAutenticado: false,
    cargando: false,
    usuario: null,
    login: vi.fn(),
    logout: vi.fn(),
    tieneRol: () => false,
  }),
}));

describe("Componente Layout", () => {
  it("renderiza el Navbar, las Guirnaldas y los hijos correctamente", () => {
    render(
      <BrowserRouter>
        <Layout>
          <div data-testid="contenido-hijo">Contenido de la página</div>
        </Layout>
      </BrowserRouter>
    );

    expect(screen.getByAltText("Decoración")).toBeInTheDocument();
    expect(screen.getByText("Librería virtual")).toBeInTheDocument();
    expect(screen.getByTestId("contenido-hijo")).toBeInTheDocument();
  });
});