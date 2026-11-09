import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import LibroNuevoForm from "./LibroNuevoForm";

describe("Componente LibroNuevoForm", () => {
  it("renderiza los campos del formulario de nuevo libro", () => {
    render(
      <BrowserRouter>
        <LibroNuevoForm onAgregar={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText(/título/i)).toBeInTheDocument();
    expect(screen.getByText(/autor\(es\)/i)).toBeInTheDocument();
    expect(screen.getByText(/precio del libro/i)).toBeInTheDocument();
    expect(screen.getByText(/disponibilidad/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /agregar libro/i })).toBeInTheDocument();
  });

  it("no ejecuta onAgregar si el formulario es inválido al enviar", async () => {
    const user = userEvent.setup();
    const mockOnAgregar = vi.fn();

    render(
      <BrowserRouter>
        <LibroNuevoForm onAgregar={mockOnAgregar} />
      </BrowserRouter>
    );

    const botonSubmit = screen.getByRole("button", { name: /agregar libro/i });
    await user.click(botonSubmit);

    expect(mockOnAgregar).not.toHaveBeenCalled();
  });
});