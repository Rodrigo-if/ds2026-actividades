import { Autor } from "../types/autor.types";

const autores: Autor[] = [
  { id: 1, nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { id: 2, nombre: "Julio Cortázar", nacionalidad: "Argentina" },
];

let proximoId = autores.length + 1;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find((a) => a.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevo: Autor = { id: proximoId++, ...datos };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Autor, "id">): Autor | undefined {
  const index = autores.findIndex((a) => a.id === id);
  if (index === -1) return undefined;

  const actualizado: Autor = { id, ...datos };
  autores[index] = actualizado;
  return actualizado;
}

export function remove(id: number): boolean {
  const index = autores.findIndex((a) => a.id === id);
  if (index === -1) return false;
  autores.splice(index, 1);
  return true;
}