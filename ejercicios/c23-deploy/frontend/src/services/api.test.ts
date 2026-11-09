import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiFetch } from "./api";
import { obtenerToken } from "./sesion";

vi.mock("./sesion", () => ({
  obtenerToken: vi.fn(),
}));

describe("Servicio apiFetch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("realiza una petición exitosa y retorna los datos en JSON", async () => {
    vi.mocked(obtenerToken).mockReturnValue(null);
    const mockResponseData = { mensaje: "OK" };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponseData,
      })
    );

    const resultado = await apiFetch<{ mensaje: string }>("/test");

    expect(resultado).toEqual(mockResponseData);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/test"),
      expect.objectContaining({
        headers: expect.not.objectContaining({ Authorization: expect.any(String) }),
      })
    );
  });

  it("agrega el header de Authorization si existe un token", async () => {
    vi.mocked(obtenerToken).mockReturnValue("mi-token-jwt");
    const mockResponseData = { data: true };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponseData,
      })
    );

    await apiFetch("/ruta-protegida");

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer mi-token-jwt",
        }),
      })
    );
  });

  it("lanza un error si la respuesta del servidor no es ok", async () => {
    vi.mocked(obtenerToken).mockReturnValue(null);

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: "Credenciales inválidas" }),
      })
    );

    await expect(apiFetch("/auth/login")).rejects.toThrow("Credenciales inválidas");
  });
});