import { describe, it, expect, vi, beforeEach } from "vitest";
import { findAll, findById, create, update, remove, findLibrosByAutorId } from "./autor.services";
import { prisma } from "../config/prisma";

vi.mock("../config/prisma", () => ({
  prisma: {
    autor: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    libro: {
      findMany: vi.fn(),
    },
  },
}));

describe("Autor Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe retornar todos los autores con sus libros", async () => {
    const mockAutores = [{ id: 1, nombre: "Borges", nacionalidad: "Argentina", libros: [] }];
    vi.mocked(prisma.autor.findMany).mockResolvedValue(mockAutores as any);

    const resultado = await findAll();
    expect(resultado).toEqual(mockAutores);
    expect(prisma.autor.findMany).toHaveBeenCalledWith({ include: { libros: true } });
  });

  it("debe eliminar un autor si existe", async () => {
    vi.mocked(prisma.autor.findUnique).mockResolvedValue({ id: 1, nombre: "Borges", nacionalidad: "Arg" } as any);
    vi.mocked(prisma.autor.delete).mockResolvedValue({ id: 1 } as any);

    const resultado = await remove(1);
    expect(resultado).toBe(true);
    expect(prisma.autor.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("debe retornar false al intentar eliminar un autor inexistente", async () => {
    vi.mocked(prisma.autor.findUnique).mockResolvedValue(null);

    const resultado = await remove(99);
    expect(resultado).toBe(false);
  });
});