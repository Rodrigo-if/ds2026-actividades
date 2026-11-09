import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { InfoLibro } from "./DetalleLibro";
import { apiFetch } from "../services/api";

vi.mock("../services/api", () => ({
  apiFetch: vi.fn(),
}));

describe("Componente InfoLibro (DetalleLibro)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el spinner mientras carga", () => {
    vi.mocked(apiFetch).mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={["/libros/1"]}>
        <Routes>
          <Route path="/libros/:id" element={<InfoLibro />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("muestra la información del libro correctamente cuando la API responde", async () => {
    const mockLibro = {
      id: 1,
      titulo: "Ficciones",
      precio: 8500,
      disponible: true,
      imagen: "https://img.com/ficciones.jpg",
      descripcion: "Obra maestra de Borges.",
      autor: { id: 1, nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
    };

    vi.mocked(apiFetch).mockResolvedValue(mockLibro);

    render(
      <MemoryRouter initialEntries={["/libros/1"]}>
        <Routes>
          <Route path="/libros/:id" element={<InfoLibro />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Ficciones")).toBeInTheDocument();
    expect(screen.getByText("Jorge Luis Borges")).toBeInTheDocument();
    expect(screen.getByText("Precio: $8500")).toBeInTheDocument();
    expect(screen.getByText("Disponible")).toBeInTheDocument();
    expect(screen.getByText("Obra maestra de Borges.")).toBeInTheDocument();
  });

  it("muestra un mensaje de error si falla la carga del libro", async () => {
    vi.mocked(apiFetch).mockRejectedValue(new Error("Error de red"));

    render(
      <MemoryRouter initialEntries={["/libros/99"]}>
        <Routes>
          <Route path="/libros/:id" element={<InfoLibro />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/error de red/i)).toBeInTheDocument();
  });
});