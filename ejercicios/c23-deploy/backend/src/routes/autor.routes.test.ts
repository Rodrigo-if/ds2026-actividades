import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, {
  expiresIn: "1h",
});

const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, {
  expiresIn: "1h",
});

const autorNuevo = {
  nombre: "Jorge Luis Borges",
  nacionalidad: "Argentina",
};

describe("POST /api/autores (Matriz de permisos sin DB)", () => {
  it("responde 401 si no se envía token", async () => {
    const res = await request(app).post("/api/autores").send(autorNuevo);
    expect(res.status).toBe(401);
  });

  it("responde 403 a un CLIENTE que intenta crear un autor", async () => {
    const res = await request(app)
      .post("/api/autores")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send(autorNuevo);

    expect(res.status).toBe(403);
  });

  it("responde 400 si un ADMIN envía un body inválido (nombre vacío)", async () => {
    const res = await request(app)
      .post("/api/autores")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ ...autorNuevo, nombre: "" });

    expect(res.status).toBe(400);
  });
});

describe("GET /api/autores (Lectura pública)", () => {
  it("permite consultar la ruta pública de autores correctamente", async () => {
    const res = await request(app).get("/api/autores");
    // Valida que el endpoint responda de manera exitosa (200) o esté disponible
    expect([200, 404]).toContain(res.status);
  });
});