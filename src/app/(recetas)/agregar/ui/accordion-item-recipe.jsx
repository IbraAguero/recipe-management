"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPrice } from "@/lib/utils";
import { Settings } from "lucide-react";
import DeleteRecipeAlertDialog from "./delete-recipe-alert-dialog";
import { useState } from "react";

const AcordionItemRecipe = ({ recipe, total }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleEdit = () => {};
  const handleDelete = () => {
    setOpenDialog(true);
  };

  return (
    <>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Settings height={30} className="hover:text-gray-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit}>
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Table className="rounded-lg bg-zinc-900 ">
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4 text-left">Ingrediente</TableHead>
                  <TableHead className="text-center">Cantidad</TableHead>
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
                  <SelectItem value="average">Promedio costo</SelectItem>
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
      <DeleteRecipeAlertDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        recipe={recipe}
      />
    </>
  );
};
export default AcordionItemRecipe;
