import { z } from "zod";

const ingredientSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  measure: z.enum([
    "gramos",
    "mililitros",
    "unidades",
    "cucharada",
    "cucharadita",
    "taza",
    "media_taza",
  ]),
});

export const formSchema = z.object({
  title: z
    .string({ required_error: "El nombre es requerido" })
    .min(1, "El nombre es requerido"),
  units: z.number().min(1, "Mínimo 1 unidad"),
  steps: z.array(z.string().min()).optional(),
  ingredients: z
    .array(ingredientSchema)
    .nonempty("Debe haber al menos un ingrediente"),
});
