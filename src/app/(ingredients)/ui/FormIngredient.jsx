"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addIngredient } from "@/lib/actions/ingredients";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { formSchema } from "@/schemas/FormIngredientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const FormIngredient = () => {
  const [state, formAction] = useFormState(addIngredient, null);

  const {
    formState: { isValid, errors },
    setError,
  } = useForm({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === "error") {
      state.errors?.forEach((error) => {
        setError(error.path, {
          message: error.message,
        });
      });
    }
    if (state.status === "success") {
      alert(state.message);
      console.log("se agrego correctamente");
    }
  }, [state, setError]);

  return (
    <form action={formAction}>
      <FormContent />
    </form>
  );
};
export default FormIngredient;
const FormContent = () => {
  const { pending } = useFormStatus();

  //console.log(pending);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Agregar ingrediente</DialogTitle>
        <DialogDescription>
          Ingrese los datos del ingrediente que desea agregar.
        </DialogDescription>
      </DialogHeader>
      <div className="grid w-full items-center gap-4 py-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" placeHolder="Ingrese un ingrediente" />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="meause">Medida</Label>
          <Select name="meause">
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Eliga una medida" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gramos">Gramos</SelectItem>
              <SelectItem value="mililitros">Mililitros</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="price">Precio</Label>
            <Input
              id="price"
              name="price"
              placeHolder="Ingrese un precio"
              className="col-span-3"
              type="number"
              step="0.01"
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={pending}>
          Agregar
        </Button>
      </DialogFooter>
    </>
  );
};
