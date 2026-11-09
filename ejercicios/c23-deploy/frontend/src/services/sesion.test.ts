import { describe, it, expect, beforeEach } from "vitest";
import { guardarToken, obtenerToken, borrarToken } from "./sesion";

describe("Servicio de Sesión (localStorage)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("guarda y obtiene el token correctamente", () => {
    const tokenPrueba = "jwt-token-seguro-123";
    guardarToken(tokenPrueba);

    expect(obtenerToken()).toBe(tokenPrueba);
  });

  it("retorna null si no hay token guardado", () => {
    expect(obtenerToken()).toBeNull();
  });

  it("borra el token correctamente", () => {
    guardarToken("token-a-borrar");
    expect(obtenerToken()).toBe("token-a-borrar");

    borrarToken();
    expect(obtenerToken()).toBeNull();
  });
});