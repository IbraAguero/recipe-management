import { getIngredients } from "@/lib/actions/ingredients";
import FormRecipe from "../../ui/form-recipe";
import { getRecipe } from "@/lib/actions/recipes";

export const dynamic = "force-dynamic";

const EditPage = async ({ params }) => {
  const ingredients = await getIngredients();
  const recipe = await getRecipe(params.id);
  console.log(recipe);

  return (
    <section className="flex flex-col">
      <main className="my-6 flex-1 px-6">
        <h1 className="text-center text-2xl font-bold">Editar receta</h1>
        <FormRecipe ingredients={ingredients} recipe={recipe} />
      </main>
    </section>
  );
};
export default EditPage;
