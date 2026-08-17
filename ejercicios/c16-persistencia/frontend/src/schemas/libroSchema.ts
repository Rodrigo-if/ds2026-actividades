import { z } from "zod";

export const libroSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  author_name: z.array(z.object({ name: z.string().min(1, "El nombre del autor es obligatorio") })).min(1, "Debe haber al menos un autor"),
  cover_i: z.string().optional(),
  precio: z.coerce.number().positive("El precio debe ser mayor a 0"),
  disponible: z.enum(["disponible", "no disponible"]),
});

export type LibroValidado = z.infer<typeof libroSchema>;
