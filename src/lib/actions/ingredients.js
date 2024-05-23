"use server";
import prisma from "../prisma";
import { formSchema } from "@/schemas/FormIngredientSchema";
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
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { name, price, meause } = formSchema.parse({
      name: FormData.get("name"),
      price: parseFloat(FormData.get("price")) || undefined,
      meause: FormData.get("meause"),
    });

    return { status: "success", message: name };
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
