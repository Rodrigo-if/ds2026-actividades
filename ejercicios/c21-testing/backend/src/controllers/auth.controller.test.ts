import { describe, it, expect, vi, beforeEach } from "vitest";
import { registrar, login, yo } from "./auth.controller";
import * as authService from "../services/auth.services";

vi.mock("../services/auth.services", () => ({
  registrar: vi.fn(),
  login: vi.fn(),
  findById: vi.fn(),
}));

describe("Auth Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe registrar un usuario y retornar status 201", async () => {
    const mockUsuario = { id: 1, email: "test@test.com", nombre: "Test" };
    vi.mocked(authService.registrar).mockResolvedValue(mockUsuario as any);

    const req = { body: { nombre: "Test", email: "test@test.com", password: "123" } } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;
    const next = vi.fn();

    await registrar(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUsuario);
  });

  it("debe retornar 401 si las credenciales de login son inválidas", async () => {
    vi.mocked(authService.login).mockResolvedValue(null);

    const req = { body: { email: "wrong@test.com", password: "123" } } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;
    const next = vi.fn();

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Credenciales inválidas" });
  });
});