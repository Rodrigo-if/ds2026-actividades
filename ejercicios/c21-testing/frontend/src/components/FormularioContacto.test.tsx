import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { FormularioContacto } from "./FormularioContacto";

describe("Componente FormularioContacto", () => {
  it("renderiza todos los campos del formulario correctamente", () => {
    render(<FormularioContacto />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/asunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /aceptar/i })).toBeInTheDocument();
  });

  it("permite llenar el formulario y muestra el toast de éxito al enviar", async () => {
    const user = userEvent.setup();
    render(<FormularioContacto />);

    await user.type(screen.getByLabelText(/nombre/i), "Juan Pérez");
    await user.type(screen.getByLabelText(/correo electrónico/i), "juan@test.com");
    await user.type(screen.getByLabelText(/mensaje/i), "Hola, tengo una consulta.");

    const botonSubmit = screen.getByRole("button", { name: /aceptar/i });
    await user.click(botonSubmit);

    expect(await screen.findByText(/mensaje enviado correctamente/i)).toBeInTheDocument();
  });
});