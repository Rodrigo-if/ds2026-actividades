import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { prisma } from "../config/prisma";
import { JWT_SECRET } from "../config/env";

const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, {
  expiresIn: "1h",
});

let autorCreado: { id: number };

beforeAll(async () => {
  // Creamos un autor de prueba en la DB real para asociar los libros
  autorCreado = await prisma.autor.create({
    data: {
      nombre: "Julio Cortázar",
      nacionalidad: "Argentina",
    },
  });
});

afterAll(async () => {
  // Limpieza de la DB al finalizar los tests
  await prisma.libro.deleteMany({
    where: { autorId: autorCreado.id },
  });
  await prisma.autor.delete({
    where: { id: autorCreado.id },
  });
  await prisma.$disconnect();
});

describe("POST y GET /api/libros (Conexión real con DB)", () => {
  it("un ADMIN puede crear un libro y persiste en la DB", async () => {
    const nuevoLibro = {
      titulo: "Ficciones",
      precio: 8500,
      imagen: "https://img/f.jpg",
      autorId: autorCreado.id,
    };

    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(nuevoLibro);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.titulo).toBe("Ficciones");
  });

  it("GET /api/libros retorna la lista de libros con estado 200", async () => {
    const res = await request(app).get("/api/libros");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});