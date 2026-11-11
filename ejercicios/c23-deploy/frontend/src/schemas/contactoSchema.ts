import { z } from 'zod'

export const contactoSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  correo: z.string().email({ message: "Ingrese un correo electrónico válido" }),
  asunto: z.enum(["Consulta", "Sugerencia", "Reclamo"], { 
    message: "Seleccione un asunto válido" 
  }),
  mensaje: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
});

export type ContactoFormData = z.infer<typeof contactoSchema>;