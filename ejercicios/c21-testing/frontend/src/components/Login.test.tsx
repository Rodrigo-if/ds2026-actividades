import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Login } from "./Login";

// Mock del hook useAuth
const mockLogin = vi.fn();

vi.mock("../hooks/useAuth.ts", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

describe("Login Component", () => {
  it("permite ingresar datos y enviarlos correctamente", async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce({}); // Simula login exitoso

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Seleccionar elementos del formulario
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

    // Simular entrada de usuario
    await user.type(emailInput, "usuario@ejemplo.com");
    await user.type(passwordInput, "password123");

    // Verificar valores en los inputs
    expect(emailInput).toHaveValue("usuario@ejemplo.com");
    expect(passwordInput).toHaveValue("password123");

    // Enviar el formulario
    await user.click(submitButton);

    // Verificar que la función de login haya sido llamada con las credenciales ingresadas
    expect(mockLogin).toHaveBeenCalledWith({
      email: "usuario@ejemplo.com",
      password: "password123",
    });
  });
});