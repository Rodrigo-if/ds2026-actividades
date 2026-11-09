import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLibros } from "./useLibros";
import { apiFetch } from "../services/api";

vi.mock("../services/api", () => ({
  apiFetch: vi.fn(),
}));

describe("useLibros Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("carga y retorna la lista de libros correctamente", async () => {
    const mockLibros = [
      { id: 1, titulo: "Rayuela", precio: 5000, autor: "Julio Cortázar", disponible: true, imagen: "" },
      { id: 2, titulo: "Ficciones", precio: 6000, autor: "Jorge Luis Borges", disponible: true, imagen: "" },
    ];

    vi.mocked(apiFetch).mockResolvedValue(mockLibros);

    const { result } = renderHook(() => useLibros());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.libros).toEqual(mockLibros);
    expect(result.current.error).toBeNull();
  });

  it("filtra los libros según el query recibido", async () => {
    const mockLibros = [
      { id: 1, titulo: "Rayuela", precio: 5000, autor: "Julio Cortázar", disponible: true, imagen: "" },
      { id: 2, titulo: "Ficciones", precio: 6000, autor: "Jorge Luis Borges", disponible: true, imagen: "" },
    ];

    vi.mocked(apiFetch).mockResolvedValue(mockLibros);

    const { result } = renderHook(() => useLibros("borges"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.libros).toHaveLength(1);
    expect(result.current.libros[0].titulo).toBe("Ficciones");
  });

  it("maneja errores cuando apiFetch falla", async () => {
    vi.mocked(apiFetch).mockRejectedValue(new Error("Error de servidor"));

    const { result } = renderHook(() => useLibros());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Error de servidor");
    expect(result.current.libros).toEqual([]);
  });
});