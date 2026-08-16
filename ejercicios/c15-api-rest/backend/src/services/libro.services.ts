import { Libro } from "../types/libro.types";

const libros: Libro[] = [
  {
    id: 1,
    title: "Ficciones",
    author_name: ["Jorge Luis Borges"],
    cover_i: 8231438,
    key: "/works/OL27448W",
    precio: 8500,
    disponible: "disponible",
  },
];

let proximoId = libros.length + 1;

export function findAll(disponibleFiltro?: string): Libro[] {
  if (!disponibleFiltro) return libros;
  return libros.filter((l) => l.disponible === disponibleFiltro);
}

export function findById(id: number): Libro | undefined {
  return libros.find((l) => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return undefined;

  const actualizado: Libro = { id, ...datos };
  libros[index] = actualizado;
  return actualizado;
}

export function remove(id: number): boolean {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return false;
  libros.splice(index, 1);
  return true;
}