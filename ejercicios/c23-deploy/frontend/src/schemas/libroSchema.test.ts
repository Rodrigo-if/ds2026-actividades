import { describe, it, expect } from "vitest";
import { libroSchema } from "./libroSchema";

describe("libroSchema", () => {
  it("valida correctamente un libro con datos válidos", () => {
    const libroValido = {
      title: "Cien años de soledad",
      author_name: [{ name: "Gabriel García Márquez" }],
      precio: 12000,
      disponible: "disponible" as const,
    };

    const resultado = libroSchema.safeParse(libroValido);
    expect(resultado.success).toBe(true);
  });

  it("falla si el título está vacío", () => {
    const libroInvalido = {
      title: "",
      author_name: [{ name: "Gabriel García Márquez" }],
      precio: 12000,
      disponible: "disponible",
    };

    const resultado = libroSchema.safeParse(libroInvalido);
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      expect(resultado.error.format().title?._errors).toContain("El título es obligatorio");
    }
  });

  it("falla si no hay ningún autor en el array", () => {
    const libroInvalido = {
      title: "Cien años de soledad",
      author_name: [],
      precio: 12000,
      disponible: "disponible",
    };

    const resultado = libroSchema.safeParse(libroInvalido);
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      expect(resultado.error.format().author_name?._errors).toContain("Debe haber al menos un autor");
    }
  });

  it("falla si el precio es menor o igual a 0", () => {
    const libroInvalido = {
      title: "Cien años de soledad",
      author_name: [{ name: "Gabriel García Márquez" }],
      precio: -500,
      disponible: "disponible",
    };

    const resultado = libroSchema.safeParse(libroInvalido);
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      expect(resultado.error.format().precio?._errors).toContain("El precio debe ser mayor a 0");
    }
  });

  it("falla si la disponibilidad no es uno de los valores permitidos", () => {
    const libroInvalido = {
      title: "Cien años de soledad",
      author_name: [{ name: "Gabriel García Márquez" }],
      precio: 12000,
      disponible: "talvez",
    };

    const resultado = libroSchema.safeParse(libroInvalido);
    expect(resultado.success).toBe(false);
  });
});