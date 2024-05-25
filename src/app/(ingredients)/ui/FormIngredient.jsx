"use client";
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
import { addIngredient } from "@/lib/actions/ingredients";
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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const FormIngredient = () => {
  const { toast } = useToast();
  const [state, formAction] = useFormState(addIngredient, null);
  const router = useRouter();

  console.log(state);

  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      meause: "",
      price: "",
      amount: "",
    },
  });

  const {
    formState: { isValid, errors },
    setError,
  } = form;

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
      toast({
        description: state.message,
        variant: "success",
      });
      router.back();
    }
  }, [state, setError, toast, router]);

  return (
    <Form {...form}>
      <form action={formAction}>
        <FormContent form={form} />
      </form>
    </Form>
  );
};
export default FormIngredient;
const FormContent = ({ form }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Agregar ingrediente</DialogTitle>

        <DialogDescription>
          Ingrese los datos del ingrediente que desea agregar.
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
                  <Select name="measure">
                    <SelectTrigger>
                      <SelectValue placeholder="Eliga una medida" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gramos">Gramos</SelectItem>
                      <SelectItem value="mililitros">Mililitros</SelectItem>
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
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese la cantidad"
                    {...field}
                    autoComplete="off"
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
        <ButtonSubmit pending={pending} />
      </DialogFooter>
    </>
  );
};

function ButtonSubmit({ pending }) {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enviando
        </>
      ) : (
        "Agregar"
      )}
    </Button>
  );
}
