import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";
import { errorHandler } from "./error.middleware";

function mocks() {
  const req = {} as Request;
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn() as unknown as NextFunction;
  return { req, res, next };
}

describe("errorHandler middleware", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {}); // Oculta los console.error esperados en los tests
  });

  it("responde 400 y detalla los errores si ocurre un ZodError", () => {
    const { req, res, next } = mocks();
    const zodError = new ZodError([
      { code: "invalid_type", expected: "string", received: "number", path: ["email"], message: "Required" } as any
    ]);

    errorHandler(zodError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Datos inválidos",
      })
    );
  });

  it("responde 400 si ocurre un error de Prisma P2003 (relación no encontrada)", () => {
    const { req, res, next } = mocks();
    // Simulando el error conocido de Prisma
    const prismaError = new Prisma.PrismaClientKnownRequestError("Mensaje", {
      code: "P2003",
      clientVersion: "5.0.0",
    });

    errorHandler(prismaError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "El autor no existe" });
  });

  it("responde 500 ante cualquier error genérico del servidor", () => {
    const { req, res, next } = mocks();
    const errorGenerico = new Error("Error inesperado de sistema");

    errorHandler(errorGenerico, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error interno del servidor" });
  });
});