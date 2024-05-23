import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  meause: z.enum(["gramos", "mililitros"], {
    required_error: "Debe seleccionar una medida válida",
  }),
  price: z
    .number({ required_error: "El precio es requerido" })
    .min(0, "El precio debe ser un número positivo")
    .nonnegative("El precio no puede ser negativo"),
});
