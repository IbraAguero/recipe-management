import { Accordion } from "@/components/ui/accordion";

import { getPrice } from "@/lib/utils";
import AcordionItemRecipe from "./accordion-item-recipe";

const AccordionContentRecipe = ({ recipes }) => {
  return (
    <div className="mt-8 grid gap-6">
      <Accordion collapsible type="single">
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
