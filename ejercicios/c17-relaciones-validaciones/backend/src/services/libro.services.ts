import { prisma } from "../config/prisma";
import { Libro, Prisma } from "../generated/prisma/client";

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;
export type LibroDetalle = Prisma.LibroGetPayload<{ include: { autor: true; categorias: true } }>;

export async function findAll(disponible?: boolean, categoria?: string): Promise<LibroConAutor[]> {
  const where: Prisma.LibroWhereInput = {};
  if (disponible !== undefined) { where.disponible = disponible; }
  if (categoria) { where.categorias = { some: { nombre: categoria }}; }
  return prisma.libro.findMany({ where, include: { autor: true } });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({ where: { id }, include: { autor: true, categorias: true } });
}

export async function create(datos: Omit<Libro, "id">): Promise<Libro> {
  const autorExiste = await prisma.autor.findUnique({ where: { id: datos.autorId } });
  if (!autorExiste) {
    const error = new Error("El autor no existe");
    (error as any).status = 400;
    throw error;
  }
  return prisma.libro.create({ data: datos });
}

export async function update(id: number, datos: Omit<Libro, "id">): Promise<Libro | null> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return null;
  await prisma.libro.update({ where: { id }, data: datos });
  return prisma.libro.findUnique({ where: { id } });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return false;                     
  await prisma.libro.delete({ where: { id } });  
  return true;

}