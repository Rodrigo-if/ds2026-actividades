import { describe, it, expect } from "vitest";
import { loginSchema } from "./loginSchema";

describe("loginSchema", () => {
  it("valida correctamente unas credenciales válidas", () => {
    const datosValidos = {
      email: "usuario@test.com",
      password: "password123",
    };

    const resultado = loginSchema.safeParse(datosValidos);
    expect(resultado.success).toBe(true);
  });

  it("falla si el correo electrónico está vacío o es inválido", () => {
    const datosInvalidos = {
      email: "correo-invalido",
      password: "password123",
    };

    const resultado = loginSchema.safeParse(datosInvalidos);
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      expect(resultado.error.format().email?._errors).toContain("Formato de correo electrónico inválido");
    }
  });

  it("falla si la contraseña tiene menos de 6 caracteres", () => {
    const datosInvalidos = {
      email: "usuario@test.com",
      password: "123",
    };

    const resultado = loginSchema.safeParse(datosInvalidos);
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      expect(resultado.error.format().password?._errors).toContain("La contraseña debe tener al menos 6 caracteres");
    }
  });
});