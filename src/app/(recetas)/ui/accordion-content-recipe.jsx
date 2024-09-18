import { Accordion } from "@/components/ui/accordion";
import { getPrice } from "@/lib/utils";
import AcordionItemRecipe from "./accordion-item-recipe";

const AccordionContentRecipe = async ({ recipes }) => {
  return (
    <div className="mt-6">
      <Accordion type="multiple">
        {recipes.length ? (
          recipes?.map((recipe) => {
            const total = recipe.ingredients.reduce(
              (acc, ingredient) => acc + Number(getPrice(ingredient)),
              0,
            );

            return (
              <AcordionItemRecipe
                recipe={recipe}
                key={recipe.id}
                total={total}
              />
            );
          })
        ) : (
          <h3 className="m-20 text-center">No hay recetas :(</h3>
        )}
      </Accordion>
    </div>
  );
};
export default AccordionContentRecipe;
