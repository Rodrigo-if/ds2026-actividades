import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useFetch } from "./useFetch";

describe("useFetch Hook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("carga datos exitosamente desde una URL", async () => {
    const mockData = { mensaje: "Hola mundo" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
      })
    );

    const { result } = renderHook(() => useFetch("/api/test"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("maneja errores de la API correctamente cuando fetch falla", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })
    );

    const { result } = renderHook(() => useFetch("/api/no-existe"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("HTTP 404");
  });
});