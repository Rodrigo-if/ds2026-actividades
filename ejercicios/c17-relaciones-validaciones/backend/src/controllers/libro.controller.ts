import { Request, Response } from "express";
import * as libroService from "../services/libro.services";

export async function getAll(req: Request, res: Response) {
  const disponible = req.query.disponible !== undefined ? req.query.disponible === "true" : undefined;
  const categoria = req.query.categoria as string | undefined;
  const libros = await libroService.findAll(disponible, categoria);
  res.json(libros);
}

export async function getById(req: Request, res: Response) {
  const libro = await libroService.findById(Number(req.params.id));
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(libro);
}

export async function create(req: Request, res: Response) {
  const nuevoLibro = await libroService.create(req.body);
  res.status(201).json(nuevoLibro);
}

export async function update(req: Request, res: Response) {
    const actualizado = await libroService.update(Number(req.params.id), req.body);
    if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
    const borrado = await libroService.remove(Number(req.params.id));
    if (!borrado) return res.status(404).json({ error: "Libro no encontrado" });
    return res.status(204).send(); // 204 = sin body. No lleva .json()
}