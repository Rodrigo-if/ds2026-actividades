import { describe, it, expect, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { validate, validateParams } from "./validate.middleware";

const schemaTest = z.object({
  nombre: z.string(),
});

function mocks(data: any = {}) {
  const req = { body: data, params: data } as unknown as Request;
  const res = {} as Response;
  const next = vi.fn();
  return { req, res, next };
}

describe("validate middleware", () => {
  it("llama a next() con un ZodError si el body no cumple con el esquema", () => {
    const { req, res, next } = mocks({ nombre: 123 }); // Envía número en vez de string
    const middleware = validate(schemaTest);

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0]).toBeInstanceOf(ZodError);
  });

  it("asigna los datos parseados a req.body y llama a next() si es válido", () => {
    const { req, res, next } = mocks({ nombre: "Carlos", extra: "ignorado" });
    const middleware = validate(schemaTest);

    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(); // Sin errores
    expect(req.body).toEqual({ nombre: "Carlos" });
  });
});

describe("validateParams middleware", () => {
  const paramSchema = z.object({
    id: z.string().regex(/^\d+$/),
  });

  it("llama a next() con ZodError si los params no son válidos", () => {
    const req = { params: { id: "abc" } } as unknown as Request;
    const res = {} as Response;
    const next = vi.fn() as unknown as NextFunction;

    validateParams(paramSchema)(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ZodError));
  });

  it("llama a next() correctamente si los params son válidos", () => {
    const req = { params: { id: "10" } } as unknown as Request;
    const res = {} as Response;
    const next = vi.fn() as unknown as NextFunction;

    validateParams(paramSchema)(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });
});