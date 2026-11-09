import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CatalogoPag from "./Catalogo";

vi.mock("../components/Catalogos.tsx", () => ({
  CatalogoInteractivo: () => <div data-testid="catalogo-interactivo">Catalogo Interactivo Mock</div>,
}));

vi.mock("../components/Botones.tsx", () => ({
  BotonInicio: () => <button>Ir al principio</button>,
}));

describe("Página CatalogoPag", () => {
  it("renderiza el título, el catálogo interactivo y el botón de inicio", () => {
    render(
      <MemoryRouter>
        <CatalogoPag />
      </MemoryRouter>
    );

    expect(screen.getByText("Catálogo de libros")).toBeInTheDocument();
    expect(screen.getByTestId("catalogo-interactivo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ir al principio/i })).toBeInTheDocument();
  });
});