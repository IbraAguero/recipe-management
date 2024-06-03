import { Accordion } from "@/components/ui/accordion";
import { getPrice } from "@/lib/utils";
import AcordionItemRecipe from "./accordion-item-recipe";
import { getRecipes } from "@/lib/actions/recipes";

const AccordionContentRecipe = async () => {
  const recipes = await getRecipes();

  return (
    <div className="mt-6">
      <Accordion type="multiple">
        {recipes?.map((recipe) => {
          const total = recipe.ingredients.reduce(
            (acc, ingredient) => acc + Number(getPrice(ingredient)),
            0,
          );

          return (
            <AcordionItemRecipe recipe={recipe} key={recipe.id} total={total} />
          );
        })}
      </Accordion>
    </div>
  );
};
export default AccordionContentRecipe;
