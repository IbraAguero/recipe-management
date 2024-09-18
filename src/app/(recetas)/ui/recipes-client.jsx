"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import AccordionContentRecipe from "./accordion-content-recipe";
import SkeletonRecipe from "./skeleton-recipe";

const RecipesClient = ({ recipes }) => {
  const [valueInput, setValueInput] = useState("");
  const filteredRecipes = recipes.filter(({ title }) =>
    title.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()),
  );
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Mis recetas</h1>
          <Link href="/agregar" className={buttonVariants()}>
            Agregar
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder="Buscar recetas..."
            className="h-10 w-[150px] lg:w-[250px]"
          />
        </div>
      </div>
      <Suspense fallback={<SkeletonRecipe />}>
        <AccordionContentRecipe recipes={filteredRecipes} />
      </Suspense>
    </>
  );
};
export default RecipesClient;
