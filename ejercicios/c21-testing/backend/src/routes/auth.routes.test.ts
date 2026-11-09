import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("POST /api/auth/login", () => {
  it("responde 400 si se envía un body vacío", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.status).toBe(400);
  });

  it("responde 400 si el email o contraseña tienen formato incorrecto", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "correo-invalido",
      password: "123",
    });
    expect(res.status).toBe(400);
  });
});

describe("POST /api/auth/register", () => {
  it("responde 400 si faltan campos obligatorios para el registro", async () => {
    const res = await request(app).post("/api/auth/register").send({
      nombre: "Nuevo Usuario",
    });
    expect(res.status).toBe(400);
  });
});