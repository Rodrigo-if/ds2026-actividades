import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Catalogo, CatalogoInteractivo } from "./Catalogos";
import { useLibros } from "../hooks/useLibros";

// Mock del hook useLibros
vi.mock("../hooks/useLibros.ts", () => ({
  useLibros: vi.fn(),
}));

describe("Componente Catalogo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el indicador de carga cuando loading es true", () => {
    vi.mocked(useLibros).mockReturnValue({
      libros: [],
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <Catalogo query="" n={10} />
      </MemoryRouter>
    );

    expect(screen.getByText(/cargando.../i)).toBeInTheDocument();
  });

  it("muestra un mensaje de error cuando ocurre una falla", () => {
    vi.mocked(useLibros).mockReturnValue({
      libros: [],
      loading: false,
      error: "Error de conexión con la API",
    });

    render(
      <MemoryRouter>
        <Catalogo query="" n={10} />
      </MemoryRouter>
    );

    expect(screen.getByText(/error al cargar: error de conexión con la api/i)).toBeInTheDocument();
  });

  it("renderiza la lista de libros recibida correctamente", () => {
    const mockLibros = [
      {
        id: 1,
        titulo: "El Aleph",
        precio: 9000,
        disponible: true,
        imagen: "https://img.com/aleph.jpg",
        autorId: 1,
        autor: { id: 1, nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
      },
    ];

    vi.mocked(useLibros).mockReturnValue({
      libros: mockLibros,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Catalogo query="" n={10} />
      </MemoryRouter>
    );

    expect(screen.getByText("El Aleph")).toBeInTheDocument();
    expect(screen.getByText("Jorge Luis Borges")).toBeInTheDocument();
  });

  it("permite filtrar la búsqueda en CatalogoInteractivo", async () => {
    const user = userEvent.setup();

    vi.mocked(useLibros).mockReturnValue({
      libros: [],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <CatalogoInteractivo cant={10} />
      </MemoryRouter>
    );

    const inputBusqueda = screen.getByPlaceholderText(/buscar libro por título o autor.../i);
    await user.type(inputBusqueda, "Borges");

    expect(inputBusqueda).toHaveValue("Borges");
    expect(useLibros).toHaveBeenCalledWith("borges", 10);
  });
});