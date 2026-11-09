import { describe, it, expect } from "vitest";
import { autorCreateSchema, autorUpdateSchema, idParamSchema } from "./autor.validation";

const autorValido = {
  nombre: "Julio Cortázar",
  nacionalidad: "Argentina",
};

describe("autorCreateSchema", () => {
  it("rechaza si falta el nombre o la nacionalidad", () => {
    const r = autorCreateSchema.safeParse({ nombre: "", nacionalidad: "" });
    expect(r.success).toBe(false);
  });

  it("recorta los espacios en blanco del nombre y nacionalidad", () => {
    const r = autorCreateSchema.safeParse({
      nombre: "  Jorge Luis Borges  ",
      nacionalidad: "  Argentina  ",
    });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.nombre).toBe("Jorge Luis Borges");
      expect(r.data.nacionalidad).toBe("Argentina");
    }
  });
});

describe("autorUpdateSchema", () => {
  it("permite actualizar parcialmente enviando solo un campo", () => {
    const r = autorUpdateSchema.safeParse({ nombre: "Adolfo Bioy Casares" });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.nombre).toBe("Adolfo Bioy Casares");
      expect(r.data.nacionalidad).toBeUndefined();
    }
  });
});

describe("idParamSchema", () => {
  it("convierte un string numérico a número entero positivo", () => {
    const r = idParamSchema.safeParse({ id: "15" });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.id).toBe(15);
    }
  });

  it("rechaza IDs que no sean números positivos", () => {
    const r = idParamSchema.safeParse({ id: "-5" });
    expect(r.success).toBe(false);
  });
});