"use server";
import prisma from "../prisma";
import { formSchema } from "@/schemas/IngredientSchema";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

/* export async function getIngredients() {
  const ingredients = await prisma.ingredient.findMany();
  console.log(ingredients);
} */

export const getIngredients = async () => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return ingredients;
  } catch (error) {
    console.log(error);
  }
};

export async function addIngredient(prevState, FormData) {
  try {
    const { name, price, measure, amount } = formSchema.parse({
      name: FormData.get("name"),
      price: parseFloat(FormData.get("price")) || undefined,
      measure: FormData.get("measure") || undefined,
      amount: parseFloat(FormData.get("amount")) || undefined,
    });

    const createIngredient = await prisma.ingredient.create({
      data: { name, price, measure, amount },
    });

    revalidatePath("/");
    return {
      status: "success",
      message: "Se agrego correctamente el ingrediente",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      };
    }
    return {
      status: "error",
      message: error.message,
    };
  }
}

export async function deleteIngredient(id) {
  try {
    console.log(id);
    const deleteIngredient = await prisma.ingredient.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return {
      status: "success",
      message: "Se elimino correctamente el ingrediente",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
}
