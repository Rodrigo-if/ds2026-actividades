import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAll, getById, create, update, remove } from "./categoria.controller";
import * as categoriaService from "../services/categoria.services";

vi.mock("../services/categoria.services", () => ({
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));

describe("Categoria Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe retornar todas las categorías", async () => {
    const mockCats = [{ id: 1, nombre: "Novela" }];
    vi.mocked(categoriaService.findAll).mockResolvedValue(mockCats);

    const req = {} as any;
    const res = { json: vi.fn() } as any;

    await getAll(req, res);
    expect(res.json).toHaveBeenCalledWith(mockCats);
  });

  it("debe retornar 404 si intenta actualizar una categoría inexistente", async () => {
    vi.mocked(categoriaService.update).mockResolvedValue(null);

    const req = { params: { id: "99" }, body: { nombre: "Test" } } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    await update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Categoría no encontrada" });
  });
});