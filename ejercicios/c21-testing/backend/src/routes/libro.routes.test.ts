import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

// Tokens generados directamente para testear permisos
const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, {
  expiresIn: "1h",
});

const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, {
  expiresIn: "1h",
});

const libroNuevo = {
  titulo: "Rayuela",
  precio: 7000,
  imagen: "https://img/r.jpg",
  autorId: 1,
};

describe("POST /api/libros (Matriz de permisos sin DB)", () => {
  it("responde 401 si no se envía token", async () => {
    const res = await request(app).post("/api/libros").send(libroNuevo);
    expect(res.status).toBe(401);
  });

  it("responde 403 a un CLIENTE que intenta crear un libro", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send(libroNuevo);

    expect(res.status).toBe(403);
  });

  it("responde 400 si un ADMIN envía un body inválido (precio negativo)", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ ...libroNuevo, precio: -5 });

    expect(res.status).toBe(400);
  });
});