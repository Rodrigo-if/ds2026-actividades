import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAll, getById, create, update, remove } from "./libro.controller";
import * as libroService from "../services/libro.services";

vi.mock("../services/libro.services", () => ({
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));

describe("Libro Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe retornar un libro por ID o 404 si no existe", async () => {
    vi.mocked(libroService.findById).mockResolvedValue(null);

    const req = { params: { id: "99" } } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    await getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Libro no encontrado" });
  });

  it("debe crear un libro exitosamente con status 201", async () => {
    const mockLibro = { id: 1, titulo: "Rayuela", precio: 5000 };
    vi.mocked(libroService.create).mockResolvedValue(mockLibro as any);

    const req = { body: mockLibro } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockLibro);
  });
});