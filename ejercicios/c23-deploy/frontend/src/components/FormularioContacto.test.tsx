import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { FormularioContacto } from "./FormularioContacto";

describe("Componente FormularioContacto", () => {
  it("renderiza todos los campos del formulario correctamente", () => {
    render(<FormularioContacto />);

    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByText("Asunto")).toBeInTheDocument();
    expect(screen.getByText("Mensaje")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /aceptar/i })).toBeInTheDocument();
  });

  it("muestra los errores de validación de Zod si se envía el formulario vacío", async () => {
    const user = userEvent.setup();
    render(<FormularioContacto />);

    const botonSubmit = screen.getByRole("button", { name: /aceptar/i });
    await user.click(botonSubmit);

    expect(await screen.findByText(/el nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/ingrese un correo electrónico válido/i)).toBeInTheDocument();
    expect(screen.getByText(/el mensaje debe tener al menos 10 caracteres/i)).toBeInTheDocument();
  });

  it("muestra error si se ingresa un correo electrónico con formato inválido", async () => {
    const user = userEvent.setup();
    render(<FormularioContacto />);

    const inputCorreo = screen.getByLabelText(/correo electrónico/i);
    await user.type(inputCorreo, "correo-invalido");

    const botonSubmit = screen.getByRole("button", { name: /aceptar/i });
    await user.click(botonSubmit);

    expect(await screen.findByText(/ingrese un correo electrónico válido/i)).toBeInTheDocument();
  });

  it("permite llenar el formulario correctamente y muestra el toast de éxito al enviar", async () => {
    const user = userEvent.setup();
    render(<FormularioContacto />);

    const inputNombre = screen.getByLabelText(/nombre/i);
    const inputCorreo = screen.getByLabelText(/correo electrónico/i);
    const inputMensaje = screen.getByLabelText(/mensaje/i);

    await user.type(inputNombre, "Juan Pérez");
    await user.type(inputCorreo, "juan@test.com");
    await user.type(inputMensaje, "Hola, tengo una consulta importante sobre el servicio.");

    const botonSubmit = screen.getByRole("button", { name: /aceptar/i });
    await user.click(botonSubmit);

    expect(await screen.findByText(/mensaje enviado correctamente/i)).toBeInTheDocument();
  });
});