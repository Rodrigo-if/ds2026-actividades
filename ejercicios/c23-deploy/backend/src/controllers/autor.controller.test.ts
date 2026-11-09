import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAll, getById, create, update, remove } from "./autor.controller";
import * as autoresService from "../services/autor.services";

vi.mock("../services/autor.services", () => ({
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));

describe("Autor Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe retornar todos los autores con status 200", async () => {
    const mockAutores = [{ id: 1, nombre: "Borges", nacionalidad: "Argentina" }];
    vi.mocked(autoresService.findAll).mockResolvedValue(mockAutores as any);

    const req = {} as any;
    const res = { json: vi.fn() } as any;

    await getAll(req, res);

    expect(res.json).toHaveBeenCalledWith(mockAutores);
  });

  it("debe retornar 404 si el autor no existe en getById", async () => {
    vi.mocked(autoresService.findById).mockResolvedValue(null);

    const req = { params: { id: "99" } } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    await getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Autor no encontrado" });
  });
});