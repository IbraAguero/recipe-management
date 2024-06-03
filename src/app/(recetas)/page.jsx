import TitleActionRecipe from "./ui/title-action-recipe";
import AccordionContentRecipe from "./ui/accordion-content-recipe";
import { Suspense } from "react";
import SkeletonRecipe from "./ui/skeleton-recipe";

const RecipesPage = async () => {
  return (
    <section className="mt-12 px-2 sm:px-24">
      <TitleActionRecipe />
      <Suspense fallback={<SkeletonRecipe />}>
        <AccordionContentRecipe />
      </Suspense>
    </section>
  );
};
export default RecipesPage;
