import { getRecipes } from "@/lib/actions/recipes";
import RecipesClient from "./ui/recipes-client";

export const dynamic = "force-dynamic";

const RecipesPage = async () => {
  const recipes = await getRecipes();

  return (
    <section className="mt-12 px-2 sm:px-24">
      <RecipesClient recipes={recipes} />
    </section>
  );
};
export default RecipesPage;
