"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteIngredient } from "@/lib/actions/ingredients";
import { toast } from "sonner";

const formatErrorMessage = (error) => {
  if (error?.message?.includes("Foreign key constraint failed")) {
    return "No se puede eliminar el ingrediente porque está asociado a una o más recetas.";
  }
  return "Ocurrió un error al intentar eliminar el ingrediente. Por favor, inténtalo de nuevo.";
};

const DeleteIngredientAlertDialog = ({ ingredient, open, closeDialog }) => {
  const handleDelete = async () => {
    const result = await deleteIngredient(ingredient.id);
    console.log(result);
    if (result.status === "success") {
      toast.success(result.message);
    }
    if (result.status === "error") {
      const formatedMessage = formatErrorMessage(result);
      console.log(formatErrorMessage);
      toast.error(formatedMessage);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Estas seguro que deseas eliminar el ingrediente?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el
            ingrediente <span className="font-bold">{ingredient.name}.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteIngredientAlertDialog;
