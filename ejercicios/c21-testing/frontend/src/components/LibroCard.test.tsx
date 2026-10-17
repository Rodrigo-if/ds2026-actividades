import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LibroCard } from "./LibroCard";
import "@testing-library/jest-dom/vitest";

describe("LibroCard Component", () => {
  const mockLibro = {
    id: 1,
    titulo: "Rayuela",
    precio: 7000,
    disponible: true,
    imagen: "https://img.com/rayuela.jpg",
    autorId: 1,
    autor: {
      id: 1,
      nombre: "Julio Cortázar",
      nacionalidad: "Argentina",
    },
  };

  it("renderiza correctamente el título, autor y enlace de detalle del libro", () => {
    render(
      <MemoryRouter>
        <LibroCard libro={mockLibro} />
      </MemoryRouter>
    );

    // Verificar título
    expect(screen.getByText("Rayuela")).toBeInTheDocument();

    // Verificar autor
    expect(screen.getByText("Julio Cortázar")).toBeInTheDocument();

    // Verificar botón/enlace de navegación al detalle
    const linkElement = screen.getByRole("link", { name: /ver más/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/detalle-libro/1");
  });
});