import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(1, "El nombre es requerido"),
  measure: z.enum(["gramos", "mililitros", "unidades"], {
    required_error: "La medida es requerida",
  }),
  price: z
    .number({ required_error: "El precio es requerido" })
    .min(0, "El precio debe ser positivo")
    .nonnegative("El precio no puede ser negativo"),
  quantity: z
    .number({ required_error: "La cantidad es requerida" })
    .min(0, "La cantidad debe ser positivo")
    .nonnegative("La cantidad no puede ser negativo"),
});
