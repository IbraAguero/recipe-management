"use server";

import { formSchema } from "@/schemas/RecipeSchema";
import { ZodError } from "zod";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function addRecipe(prevState, FormData) {
  try {
    const title = FormData.get("title");
    const units = Number(FormData.get("units"));
    const stepsString = FormData.get("steps");
    const ingredientsString = FormData.get("ingredients");

    const ingredients = JSON.parse(ingredientsString).map((ingredient) => ({
      ...ingredient,
      quantity: Number(ingredient.quantity),
    }));

    const steps = stepsString
      ? stepsString.split(",").map((step) => step.trim())
      : [];

    const validatedData = formSchema.parse({
      title,
      units,
      steps,
      ingredients,
    });

    const newRecipe = await prisma.$transaction(async (prisma) => {
      const recipe = await prisma.recipe.create({
        data: {
          title: validatedData.title,
          steps: validatedData.steps,
          units: validatedData.units,
        },
      });

      const recipeIngredients = validatedData.ingredients.map((ingredient) => ({
        recipeId: recipe.id,
        ingredientId: ingredient.id,
        quantity: parseFloat(ingredient.quantity),
        measure: ingredient.measure,
      }));

      await prisma.recipeIngredient.createMany({
        data: recipeIngredients,
      });

      return recipe;
    });

    revalidatePath("/");
    return {
      status: "success",
      message: "Se agrego correctamente la receta",
    };
  } catch (error) {
    console.log(error.message);
    if (error instanceof ZodError) {
      console.log(error.message);
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

export async function editRecipe(prevState, FormData) {
  console.log(FormData);
  try {
    const id = FormData.get("id");
    const title = FormData.get("title");
    const units = Number(FormData.get("units"));
    const stepsString = FormData.get("steps");
    const ingredientsString = FormData.get("ingredients");

    const ingredients = JSON.parse(ingredientsString).map((ingredient) => ({
      ...ingredient,
      quantity: Number(ingredient.quantity),
      id: ingredient.ingredientId ? ingredient.ingredientId : ingredient.id,
    }));

    console.log(ingredients);

    const steps = stepsString
      ? stepsString.split(",").map((step) => step.trim())
      : [];

    const validatedData = formSchema.parse({
      title,
      units,
      steps,
      ingredients,
    });

    const updatedRecipe = await prisma.$transaction(async (prisma) => {
      // Actualizar la receta
      const recipe = await prisma.recipe.update({
        where: { id },
        data: {
          title: validatedData.title,
          steps: validatedData.steps,
          units: validatedData.units,
        },
      });

      await prisma.recipeIngredient.deleteMany({
        where: { recipeId: id },
      });

      const recipeIngredients = validatedData.ingredients.map((ingredient) => ({
        recipeId: id,
        ingredientId: ingredient.id,
        quantity: parseFloat(ingredient.quantity),
        measure: ingredient.measure,
      }));

      await prisma.recipeIngredient.createMany({
        data: recipeIngredients,
      });

      return recipe;
    });

    revalidatePath("/");
    return {
      status: "success",
      message: "Se actualizó correctamente la receta",
    };
  } catch (error) {
    console.log(error.message);
    if (error instanceof ZodError) {
      return {
        status: "error",
        message: "Datos del formulario inválidos",
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
export async function getRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: { ingredients: { include: { ingredient: true } } },
    });

    return recipes.map((recipe) => ({
      ...recipe,
      ingredients: recipe.ingredients.map((ri) => ({
        id: ri.id,
        recipeId: ri.recipeId,
        ingredientId: ri.ingredientId,
        quantity: ri.quantity,
        measure: ri.measure,
        name: ri.ingredient.name,
        pricePerUnit: ri.ingredient.pricePerUnit,
      })),
    }));
  } catch (error) {
    console.log(error.message);
  }
}
export async function getRecipe(id) {
  try {
    const recipe = await prisma.recipe.findFirst({
      where: { id },
      include: { ingredients: { include: { ingredient: true } } },
    });

    const recipeParse = {
      ...recipe,
      ingredients: recipe.ingredients.map((ri) => ({
        id: ri.id,
        recipeId: ri.recipeId,
        ingredientId: ri.ingredientId,
        quantity: ri.quantity,
        measure: ri.measure,
        name: ri.ingredient.name,
        pricePerUnit: ri.ingredient.pricePerUnit,
      })),
    };

    return recipeParse;
  } catch (error) {
    console.log(error.message);
  }
}

export async function deleteRecipe(id) {
  try {
    const deleteRecipe = await prisma.recipe.delete({ where: { id } });

    revalidatePath("/");
    return { status: "success", message: "La receta se elimino con exito" };
  } catch (error) {
    console.log(error);
  }
}
