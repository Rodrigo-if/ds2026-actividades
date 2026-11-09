import { describe, it, expect, vi, beforeEach } from "vitest";
import { registrar, login, findById } from "./auth.services";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";

vi.mock("../config/prisma", () => ({
  prisma: {
    usuario: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn().mockResolvedValue("hashed_password"),
    compare: vi.fn(),
  },
}));

describe("Auth Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe registrar un usuario correctamente y retornar sus datos sin passwordHash", async () => {
    const mockUsuario = { 
      id: 1, 
      email: "test@test.com", 
      nombre: "Test", 
      rol: "CLIENTE", 
      creadoEn: new Date() 
    };
    vi.mocked(prisma.usuario.create).mockResolvedValue(mockUsuario as any);

    const resultado = await registrar({ 
      nombre: "Test", 
      email: "test@test.com", 
      password: "Password123" 
    });

    expect(resultado).toEqual(mockUsuario);
    expect(bcrypt.hash).toHaveBeenCalled();
  });

  it("debe retornar null en login si el usuario no existe", async () => {
    vi.mocked(prisma.usuario.findUnique).mockResolvedValue(null);

    const resultado = await login({ email: "noexiste@test.com", password: "Password123" });
    expect(resultado).toBeNull();
  });
});