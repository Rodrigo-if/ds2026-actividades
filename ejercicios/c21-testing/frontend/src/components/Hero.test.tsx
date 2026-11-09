import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Hero } from "./Hero";

describe("Componente Hero", () => {
  it("renderiza el título de bienvenida y el enlace al catálogo", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );

    expect(screen.getByText(/bienvenido a la librería virtual/i)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /ver catálogo/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/catalogo");
  });
});