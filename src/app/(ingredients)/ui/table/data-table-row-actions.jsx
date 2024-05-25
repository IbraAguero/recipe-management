import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { deleteIngredient } from "@/lib/actions/ingredients";
import { MoreHorizontal } from "lucide-react";

export const DataTableRowActions = ({ row }) => {
  const { toast } = useToast();
  const ingredient = row.original;

  const handleDelete = async () => {
    const result = await deleteIngredient(ingredient.id);
    console.log(result);
    if (result.status === "success") {
      toast({
        description: result.message,
        variant: "success",
      });
    }
  };

  return (
    <div className="mr-2 max-w-1">
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
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
