import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import DetalleLibro from "./Detalle";

vi.mock("../components/DetalleLibro.tsx", () => ({
  InfoLibro: () => <div data-testid="info-libro">Info Libro Mock</div>,
}));

vi.mock("../components/Botones.tsx", () => ({
  BotonVolver: () => <button>Volver</button>,
}));

describe("Página DetalleLibro", () => {
  it("renderiza la información del libro y el botón volver", () => {
    render(
      <MemoryRouter>
        <DetalleLibro />
      </MemoryRouter>
    );

    expect(screen.getByTestId("info-libro")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /volver/i })).toBeInTheDocument();
  });
});