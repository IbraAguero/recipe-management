import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRecipes } from "@/lib/actions/recipes";
import { getPrice } from "@/lib/utils";
import Link from "next/link";

const RecipesPage = async () => {
  const recipes = await getRecipes();
  return (
    <section className="container mt-12 flex flex-col px-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Mis recetas</h1>
          <Link href="/agregar" className={buttonVariants()}>
            Agregar
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Buscar recetas..."
            className="h-10 w-[150px] lg:w-[250px]"
          />
          <Button variant="outline" className="h-10">
            Buscar
          </Button>
        </div>
      </div>
      <div className="mt-8 grid gap-6">
        <Accordion collapsible type="single">
          {recipes?.map((recipe) => {
            const total = recipe.ingredients.reduce(
              (acc, ingredient) => acc + Number(getPrice(ingredient)),
              0,
            );

            return (
              <AccordionItem
                key={recipe.title}
                value={recipe.title.toLowerCase().replace(" ", "-")}
              >
                <AccordionTrigger className="flex items-center rounded-lg border-none p-4">
                  <h2 className="text-lg font-medium">{recipe.title}</h2>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-xl border border-zinc-700 bg-zinc-800 px-10 py-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">Ingredientes</h3>
                      <Button size="icon">C</Button>
                    </div>
                    <Table className="rounded-lg bg-zinc-900 ">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="pl-4 text-left">
                            Ingrediente
                          </TableHead>
                          <TableHead className="text-center">
                            Cantidad
                          </TableHead>
                          <TableHead className="text-center">Medida</TableHead>
                          <TableHead className="text-center">Precio</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recipe.ingredients.map((ingredient) => (
                          <TableRow key={ingredient.id} className="text-center">
                            <TableCell className="pl-5 text-left">
                              {ingredient.name}
                            </TableCell>
                            <TableCell>{ingredient.quantity}</TableCell>
                            <TableCell>{ingredient.measure}</TableCell>
                            <TableCell>${getPrice(ingredient)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mx-4 mt-4 flex items-center justify-between gap-3">
                      <div className="text-md flex gap-2 font-medium">
                        <div className=" rounded-sm bg-zinc-900 p-2">
                          Costo Total:
                          <span> ${total}</span>
                        </div>
                        {recipe.units !== 1 && (
                          <div className="rounded-sm bg-zinc-900 p-2">
                            Costo / Unidad:
                            <span> ${parseInt(total / recipe.units)}</span>
                          </div>
                        )}
                      </div>

                      <Select defaultValue="last">
                        <SelectTrigger className="w-[150px] bg-zinc-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last">Ultimo costo</SelectItem>
                          <SelectItem value="average">
                            Promedio costo
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {recipe.steps && recipe.steps.length > 0 && (
                      <>
                        <h3 className="mb-4 mt-6 text-lg font-medium">Pasos</h3>
                        <ol className="space-y-2 text-gray-400">
                          {recipe.steps.map((step, index) => (
                            <li key={index}>
                              {index + 1}. {step}
                            </li>
                          ))}
                        </ol>
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};
export default RecipesPage;
