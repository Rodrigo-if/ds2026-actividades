import { describe, it, expect, vi, beforeEach } from "vitest";
import { findAll, findById, create, update, remove } from "./libro.services";
import { prisma } from "../config/prisma";

vi.mock("../config/prisma", () => ({
  prisma: {
    libro: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    autor: {
      findUnique: vi.fn(),
    },
  },
}));

describe("Libro Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe lanzar un error si se intenta crear un libro con un autor inexistente", async () => {
    vi.mocked(prisma.autor.findUnique).mockResolvedValue(null);

    const nuevoLibro = {
      titulo: "Test",
      descripcion: "Descripción de prueba",
      precio: 100,
      imagen: "img.jpg",
      disponible: true,
      autorId: 99
    };

    await expect(create(nuevoLibro)).rejects.toThrow("El autor no existe");
  });

  it("debe crear un libro exitosamente si el autor existe", async () => {
    vi.mocked(prisma.autor.findUnique).mockResolvedValue({ id: 1, nombre: "Autor", nacionalidad: "Arg" } as any);
    const mockLibro = { id: 1, titulo: "Test", precio: 100, imagen: "img.jpg", disponible: true, autorId: 1 };
    vi.mocked(prisma.libro.create).mockResolvedValue(mockLibro as any);

    const resultado = await create(mockLibro as any);
    expect(resultado).toEqual(mockLibro);
    expect(prisma.libro.create).toHaveBeenCalledWith({ data: mockLibro });
  });

  it("debe retornar false al intentar eliminar un libro que no existe", async () => {
    vi.mocked(prisma.libro.findUnique).mockResolvedValue(null);

    const resultado = await remove(99);
    expect(resultado).toBe(false);
  });
});