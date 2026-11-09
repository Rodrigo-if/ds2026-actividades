import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LibroNuevo from "./LibroNuevo";

vi.mock("../components/LibroNuevoForm.tsx", () => ({
  default: () => <div data-testid="libro-nuevo-form">Formulario Nuevo Libro Mock</div>,
}));

vi.mock("../components/Botones.tsx", () => ({
  BotonVolver: () => <button>Volver</button>,
}));

describe("Página LibroNuevo", () => {
  it("renderiza el título, el formulario de nuevo libro y el botón volver", () => {
    render(
      <MemoryRouter>
        <LibroNuevo onAgregar={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("Agregar nuevo libro")).toBeInTheDocument();
    expect(screen.getByTestId("libro-nuevo-form")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /volver/i })).toBeInTheDocument();
  });
});