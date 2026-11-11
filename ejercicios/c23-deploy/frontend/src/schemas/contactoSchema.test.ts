import { describe, it, expect } from "vitest";
import { contactoSchema } from "./contactoSchema";

describe("contactoSchema", () => {
  it("valida correctamente un objeto con datos válidos", () => {
    const datosValidos = {
      nombre: "Rodrigo",
      correo: "rodrigo@example.com",
      asunto: "Consulta" as const,
      mensaje: "Hola, este es un mensaje de prueba válido.",
    };

    const resultado = contactoSchema.safeParse(datosValidos);

    expect(resultado.success).toBe(true);
    if (resultado.success) {
      expect(resultado.data).toEqual(datosValidos);
    }
  });

  it("falla si el nombre tiene menos de 2 caracteres", () => {
    const datosInvalidos = {
      nombre: "R",
      correo: "rodrigo@example.com",
      asunto: "Consulta" as const,
      mensaje: "Hola, este es un mensaje de prueba válido.",
    };

    const resultado = contactoSchema.safeParse(datosInvalidos);

    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      const errorNombre = resultado.error.format().nombre?._errors;
      expect(errorNombre).toContain("El nombre debe tener al menos 2 caracteres");
    }
  });

  it("falla si el correo electrónico no tiene un formato válido", () => {
    const datosInvalidos = {
      nombre: "Rodrigo",
      correo: "correo-invalido",
      asunto: "Consulta" as const,
      mensaje: "Hola, este es un mensaje de prueba válido.",
    };

    const resultado = contactoSchema.safeParse(datosInvalidos);

    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      const errorCorreo = resultado.error.format().correo?._errors;
      expect(errorCorreo).toContain("Ingrese un correo electrónico válido");
    }
  });

  it("falla si el asunto no pertenece a los valores permitidos del enum", () => {
    const datosInvalidos = {
      nombre: "Rodrigo",
      correo: "rodrigo@example.com",
      asunto: "OtroAsunto",
      mensaje: "Hola, este es un mensaje de prueba válido.",
    };

    const resultado = contactoSchema.safeParse(datosInvalidos);

    expect(resultado.success).toBe(false);
  });

  it("falla si el mensaje tiene menos de 10 caracteres", () => {
    const datosInvalidos = {
      nombre: "Rodrigo",
      correo: "rodrigo@example.com",
      asunto: "Consulta" as const,
      mensaje: "Corto",
    };

    const resultado = contactoSchema.safeParse(datosInvalidos);

    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      const errorMensaje = resultado.error.format().mensaje?._errors;
      expect(errorMensaje).toContain("El mensaje debe tener al menos 10 caracteres");
    }
  });
});