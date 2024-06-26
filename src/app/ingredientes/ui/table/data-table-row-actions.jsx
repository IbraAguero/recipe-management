import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteIngredientAlertDialog from "./delete-ingredient-alert-dialog";

export const DataTableRowActions = ({ row }) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const ingredient = row.original;

  const handleEdit = async () => {
    router.push(`ingredientes/editar/${ingredient.id}`);
  };

  const handleDelete = async () => {
    setOpenModal(true);
  };

  return (
    <div className="min-w-2 max-w-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteIngredientAlertDialog
        open={openModal}
        ingredient={ingredient}
        closeDialog={() => setOpenModal(false)}
      />
    </div>
  );
};
