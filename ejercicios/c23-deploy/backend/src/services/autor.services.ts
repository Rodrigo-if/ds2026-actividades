import { prisma } from "../config/prisma";
import { Autor, Prisma } from "../generated/prisma/client";

export type AutorConLibros = Prisma.AutorGetPayload<{ include: { libros: true } }>;

export async function findAll(): Promise<AutorConLibros[]> {
  return prisma.autor.findMany({ include: { libros: true } });
}

export async function findById(id: number): Promise<AutorConLibros | null> {
  return prisma.autor.findUnique({
    where: { id },
    include: { libros: true }
  });
}

export async function create(datos: Omit<Autor, "id">): Promise<Autor> {
  return prisma.autor.create({
    data: datos
  });
}

export async function update(id: number, datos: Partial<Omit<Autor, "id">>): Promise<Autor | null> {
  return prisma.autor.update({
    where: { id },
    data: datos
  });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.autor.findUnique({ where: { id } });
  if (!existe) return false;
  await prisma.autor.delete({ where: { id } });
  return true;
}

export async function findLibrosByAutorId(autorId: number) {
  const autor = await prisma.autor.findUnique({ where: { id: autorId } });
  if (!autor) return null;
  return prisma.libro.findMany({ where: { autorId } });
}