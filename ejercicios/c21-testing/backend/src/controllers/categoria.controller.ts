import { Request, Response } from "express";
import * as categoriaService from "../services/categoria.services";

export async function getAll(req: Request, res: Response) {
  const categorias = await categoriaService.findAll();
  res.json(categorias);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const categoria = await categoriaService.findById(id);
  if (!categoria) return res.status(404).json({ mensaje: "Categoría no encontrada" });
  res.json(categoria);
}

export async function create(req: Request, res: Response) {
  const nueva = await categoriaService.create(req.body);
  res.status(201).json(nueva);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const actualizada = await categoriaService.update(id, req.body);
  if (!actualizada) return res.status(404).json({ mensaje: "Categoría no encontrada" });
  res.json(actualizada);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const eliminada = await categoriaService.remove(id);
  if (!eliminada) return res.status(404).json({ mensaje: "Categoría no encontrada" });
  res.status(204).send();
}