import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addIngredient, editIngredient } from "@/lib/actions/ingredients";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { formSchema } from "@/schemas/IngredientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormIngredient = ({ ingredient, closeDialog }) => {
  const isEditing = !!ingredient?.id;

  const functionAction = isEditing ? editIngredient : addIngredient;
  const [state, formAction] = useFormState(functionAction, null);
  const router = useRouter();

  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ingredient?.name || "",
      measure: ingredient?.measure || "",
      price: ingredient?.price || "",
      quantity: ingredient?.quantity || "",
    },
  });

  const { setError } = form;

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
      toast.success(state.message);
      closeDialog();
    }
  }, [state, setError, router]);

  return (
    <Form {...form}>
      <form action={formAction}>
        <input hidden name="id" value={ingredient?.id} />
        <DialogHeader>
          <DialogTitle>
            {ingredient ? "Editar Ingrediente" : "Agregar Ingrediente"}
          </DialogTitle>
          <DialogDescription>
            {ingredient
              ? "Ingrese los datos del ingrediente que desea modificar."
              : " Ingrese los datos del ingrediente que desea agregar."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full grid-cols-4 items-center gap-4 py-4">
          <div className="col-span-4 flex flex-col space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese un ingrediente"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2 flex flex-col space-y-2">
            <FormField
              control={form.control}
              name="measure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medida</FormLabel>
                  <FormControl>
                    <Select
                      name="measure"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Eliga una medida" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gramos">Gramos</SelectItem>
                        <SelectItem value="mililitros">Mililitros</SelectItem>
                        <SelectItem value="unidades">Unidades</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2 flex flex-col space-y-2">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ingrese la cantidad"
                      type="number"
                      min="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4 flex flex-col space-y-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ingrese un precio"
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <ButtonSubmit ingredient={ingredient} />
        </DialogFooter>
      </form>
    </Form>
  );
};
export default FormIngredient;

function ButtonSubmit({ ingredient }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enviando
        </>
      ) : ingredient ? (
        "Editar"
      ) : (
        "Agregar"
      )}
    </Button>
  );
}
