"use server";
import prisma from "../prisma";
import { formSchema } from "@/schemas/IngredientSchema";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export const getIngredient = async (id) => {
  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: { id },
    });
    return ingredient;
  } catch (error) {
    console.log(error);
  }
};
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
    const { name, price, measure, quantity } = formSchema.parse({
      name: FormData.get("name"),
      price: parseFloat(FormData.get("price")) || undefined,
      measure: FormData.get("measure") || undefined,
      quantity: parseFloat(FormData.get("quantity")) || undefined,
    });

    const pricePerUnit = price / quantity;

    const createIngredient = await prisma.ingredient.create({
      data: { name, price, measure, quantity, pricePerUnit },
    });

    revalidatePath("/ingredientes");
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
    const deleteIngredient = await prisma.ingredient.delete({
      where: {
        id,
      },
    });
    revalidatePath("/ingredientes");
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
