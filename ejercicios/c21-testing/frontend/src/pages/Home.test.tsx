import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

vi.mock("../components/Hero.tsx", () => ({
  Hero: () => <div data-testid="hero">Hero Mock</div>,
}));

vi.mock("../components/Catalogos.tsx", () => ({
  Catalogo: () => <div data-testid="catalogo-destacados">Catalogo Mock</div>,
}));

describe("Página Home", () => {
  it("renderiza el Hero, el título de destacados y el componente Catalogo", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByText("Libros destacados")).toBeInTheDocument();
    expect(screen.getByTestId("catalogo-destacados")).toBeInTheDocument();
  });
});