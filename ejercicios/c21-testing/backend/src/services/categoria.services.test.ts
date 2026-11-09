import { describe, it, expect, vi, beforeEach } from "vitest";
import { findAll, findById, create, update, remove } from "./categoria.services";
import { prisma } from "../config/prisma";

vi.mock("../config/prisma", () => ({
  prisma: {
    categoria: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("Categoria Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe retornar todas las categorías", async () => {
    const mockCategorias = [{ id: 1, nombre: "Novela" }];
    vi.mocked(prisma.categoria.findMany).mockResolvedValue(mockCategorias);

    const resultado = await findAll();
    expect(resultado).toEqual(mockCategorias);
  });

  it("debe crear una categoría correctamente", async () => {
    const nuevaCat = { id: 1, nombre: "Ficción" };
    vi.mocked(prisma.categoria.create).mockResolvedValue(nuevaCat);

    const resultado = await create({ nombre: "Ficción" });
    expect(resultado).toEqual(nuevaCat);
    expect(prisma.categoria.create).toHaveBeenCalledWith({ data: { nombre: "Ficción" } });
  });

  it("debe retornar null al actualizar una categoría que no existe", async () => {
    vi.mocked(prisma.categoria.findUnique).mockResolvedValue(null);

    const resultado = await update(99, { nombre: "Terror" });
    expect(resultado).toBeNull();
  });
});