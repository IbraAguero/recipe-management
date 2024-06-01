import { getRecipes } from "@/lib/actions/recipes";
import TitleActionRecipe from "./agregar/ui/TitleActionRecipe";
import AccordionContentRecipe from "./agregar/ui/accordion-content-recipe";

const RecipesPage = async () => {
  const recipes = await getRecipes();
  console.log(recipes);
  return (
    <section className="container mt-12 flex flex-col px-24">
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
