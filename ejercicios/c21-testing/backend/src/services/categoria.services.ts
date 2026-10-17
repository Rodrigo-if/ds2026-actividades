import { prisma } from "../config/prisma";
import { Categoria } from "../generated/prisma/client";

export async function findAll(): Promise<Categoria[]> {
  return prisma.categoria.findMany();
}

export async function findById(id: number): Promise<Categoria | null> {
  return prisma.categoria.findUnique({ where: { id } });
}

export async function create(datos: Omit<Categoria, "id">): Promise<Categoria> {
  return prisma.categoria.create({ data: datos });
}

export async function update(id: number, datos: Partial<Omit<Categoria, "id">>): Promise<Categoria | null> {
  const existe = await prisma.categoria.findUnique({ where: { id } });
  if (!existe) return null;
  return prisma.categoria.update({ where: { id }, data: datos });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.categoria.findUnique({ where: { id } });
  if (!existe) return false;
  await prisma.categoria.delete({ where: { id } });
  return true;
}