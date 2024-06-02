import { getIngredients } from "@/lib/actions/ingredients";
import FormRecipe from "../ui/FormRecipe";

const RecipeAddPage = async () => {
  const ingredients = await getIngredients();

  return (
    <section className="flex flex-col">
      <main className="my-6 flex-1 px-6">
        <h1 className="text-center text-2xl font-bold">Agregar receta</h1>
        <FormRecipe ingredients={ingredients} />
      </main>
    </section>
  );
};
export default RecipeAddPage;
