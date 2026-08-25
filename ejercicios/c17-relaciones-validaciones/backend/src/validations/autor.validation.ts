import { z } from "zod";

export const autorCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  nacionalidad: z.string().trim().min(1, "La nacionalidad es obligatoria").max(100),
});
export const autorUpdateSchema = autorCreateSchema.partial();
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número positivo"),
});
export type AutorCreate = z.infer<typeof autorCreateSchema>;