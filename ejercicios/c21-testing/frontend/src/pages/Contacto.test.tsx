import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Contacto from "./Contacto";

vi.mock("../components/FormularioContacto.tsx", () => ({
  FormularioContacto: () => <div data-testid="formulario-contacto">Formulario Mock</div>,
}));

vi.mock("../components/Botones.tsx", () => ({
  BotonVolver: () => <button>Volver</button>,
}));

describe("Página Contacto", () => {
  it("renderiza el título, el formulario de contacto y el botón volver", () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    expect(screen.getByText("Contacto")).toBeInTheDocument();
    expect(screen.getByTestId("formulario-contacto")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /volver/i })).toBeInTheDocument();
  });
});