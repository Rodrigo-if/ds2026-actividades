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

  it("permite llenar el formulario y muestra el toast de éxito al enviar", async () => {
    const user = userEvent.setup();
    render(<FormularioContacto />);

    // Seleccionamos los inputs mediante sus names definidos en el componente
    const inputNombre = document.querySelector('input[name="nombre"]')!;
    const inputCorreo = document.querySelector('input[name="correo"]')!;
    const inputMensaje = document.querySelector('textarea[name="mensaje"]')!;

    await user.type(inputNombre, "Juan Pérez");
    await user.type(inputCorreo, "juan@test.com");
    await user.type(inputMensaje, "Hola, tengo una consulta.");

    const botonSubmit = screen.getByRole("button", { name: /aceptar/i });
    await user.click(botonSubmit);

    expect(await screen.findByText(/mensaje enviado correctamente/i)).toBeInTheDocument();
  });
});