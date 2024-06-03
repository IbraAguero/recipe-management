import { getRecipes } from "@/lib/actions/recipes";
import TitleActionRecipe from "./ui/title-action-recipe";
import AccordionContentRecipe from "./ui/accordion-content-recipe";

const RecipesPage = async () => {
  const recipes = await getRecipes();
  console.log(recipes);
  return (
    <section className="mt-12 px-2 sm:px-24">
      <TitleActionRecipe />
      {recipes.length > 0 ? (
        <AccordionContentRecipe recipes={recipes} />
      ) : (
        <div className="mx-auto mt-20">
          <h3 className="text-xl font-bold">No hay recetas guardadas :(</h3>
        </div>
      )}
    </section>
  );
};
export default RecipesPage;
