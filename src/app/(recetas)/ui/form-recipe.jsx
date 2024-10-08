"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Loader2, Trash2 } from "lucide-react";
import { addRecipe, editRecipe } from "@/lib/actions/recipes";
import { useFormState, useFormStatus } from "react-dom";
import { formSchema } from "@/schemas/RecipeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ComboboxIngredient } from "@/components/combobox-ingredient";

const measures = {
  mililitros: "Mililitros",
  gramos: "Gramos",
  unidades: "Unidades",
  taza: "Taza",
  media_taza: "Taza 1/2",
  cucharada: "Cucharada",
  cucharadita: "Cucharadita",
};

// FACTORIZAR MEDIDAS

const FormRecipe = ({ ingredients, recipe }) => {
  const router = useRouter();
  const functionAction = recipe ? editRecipe : addRecipe;

  const [state, formAction] = useFormState(functionAction, null);

  const [steps, setSteps] = useState(recipe?.steps || []);
  const [currentStep, setCurrentStep] = useState("");
  const [ingredientsForm, setIngredientsForm] = useState(
    recipe?.ingredients || [],
  );
  const [availableMeasures, setAvailableMeasures] = useState([]);

  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: recipe?.title || "",
      steps: "",
      units: recipe?.units || "",
      ingredients: "",
      ingredientsSelect: "",
      measures: "",
      quantity: "",
    },
  });

  const {
    getValues,
    resetField,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = form;

  const ingredient = watch("ingredientsSelect");
  const measure = watch("measure");

  useEffect(() => {
    if (ingredient) {
      const measures = getMeasuresForIngredient(ingredient);
      setAvailableMeasures(measures);
      setValue("measure", "");
      //resetField("measure");
    } else {
      setAvailableMeasures([]);
    }
  }, [ingredient]);

  const getMeasuresForIngredient = (ingredientId) => {
    const ingredient = ingredients.find((i) => i.id === ingredientId);
    if (ingredient) {
      switch (ingredient.measure) {
        case "mililitros":
          return [
            "mililitros",
            "cucharada",
            "cucharadita",
            "taza",
            "media_taza",
          ];
        case "gramos":
          return ["gramos", "cucharada", "taza", "media_taza"];
        case "unidades":
          return ["unidades"];
        default:
          return [];
      }
    }
    return [];
  };

  const addIngredient = () => {
    const idIngredient = getValues("ingredientsSelect");
    const quantity = getValues("quantity");
    const measure = getValues("measure");
    if (idIngredient && quantity && measure) {
      const ingredient = ingredients.find(
        (ingredient) => ingredient.id === idIngredient,
      );
      setIngredientsForm([
        ...ingredientsForm,
        { ...ingredient, quantity, measure },
      ]);
      setValue("ingredientsSelect", "");
      resetField("quantity");
      resetField("measure");
    }
  };

  const removeIngredient = (index) => {
    setIngredientsForm(ingredientsForm.filter((_, i) => i !== index));
  };

  const addStep = () => {
    if (currentStep.trim() !== "") {
      setSteps([...steps, currentStep]);
      setCurrentStep("");
    }
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

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
      console.log(errors);
      if (errors?.ingredients) {
        toast.error("Faltan los ingredientes", {
          description: errors.ingredients.message,
        });
      }
    }
    if (state.status === "success") {
      toast.success(state.message);
      router.push("/");
    }
  }, [state]);

  useEffect(() => {
    if (errors) {
      setTimeout(() => {
        clearErrors();
      }, 5000);
    }
  }, [errors]);

  return (
    <Form {...form}>
      <form className="mx-auto mt-5 grid max-w-2xl gap-2" action={formAction}>
        <input hidden name="id" value={recipe?.id} />
        <div className="grid items-center sm:grid-cols-[1fr_200px] sm:gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título de la Receta</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa el título de la receta"
                    {...field}
                    autoComplete="off"
                    className="w-full border-zinc-800 bg-zinc-900"
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="units"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidades que rinde</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Número de unidades"
                    className="w-full border-zinc-800 bg-zinc-900"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4 grid gap-4">
          <input
            name="ingredients"
            value={JSON.stringify(ingredientsForm)}
            hidden
            readOnly
          />
          <div className="grid gap-4">
            <FormLabel>Ingredientes de la Receta</FormLabel>
            <div className="grid items-center gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="ingredientsSelect"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <ComboboxIngredient
                        name="ingredientsSelect"
                        ingredients={ingredients}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="measure"
                render={({ field }) => (
                  <Select
                    disabled={!ingredient}
                    name="measure"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full bg-zinc-900">
                      <SelectValue placeholder="Selecciona una medida" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Medidas</SelectLabel>
                        {availableMeasures.map((measure) => (
                          <SelectItem key={measure} value={measure}>
                            {measures[measure]}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <Input
                    type="number"
                    min="0"
                    disabled={!measure}
                    {...field}
                    className="w-full border-zinc-800 bg-zinc-900"
                    placeholder="Cantidad"
                  />
                )}
              />
            </div>
            <Button
              className="w-full rounded-md bg-zinc-800 px-4 py-2 font-medium text-zinc-50 hover:bg-zinc-700"
              variant="outline"
              type="button"
              onClick={addIngredient}
            >
              Agregar Ingrediente
            </Button>
            <ul className="grid gap-2">
              {ingredientsForm.map((el, index) => (
                <li
                  className="flex items-center justify-between rounded-md bg-zinc-800 p-2 px-3 text-sm font-medium"
                  key={index}
                >
                  <span>
                    {index + 1}. {el.name} | {el.quantity}{" "}
                    {el.measure !== "media_taza" ? el.measure : "Taza 1/2"}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-4 w-4"
                    type="button"
                    onClick={() => removeIngredient(index)}
                  >
                    <Trash2 />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-4 grid gap-4">
          <input hidden value={steps} name="steps" readOnly />
          <FormLabel>Pasos de la Receta</FormLabel>
          <Input
            placeholder="Ingresa un paso de la receta"
            value={currentStep}
            onChange={(e) => setCurrentStep(e.target.value)}
            autoComplete="off"
            className="w-full border-zinc-800 bg-zinc-900"
          />
          <Button
            onClick={addStep}
            type="button"
            className="w-full rounded-md bg-zinc-800 px-4 py-2 font-medium text-zinc-50 hover:bg-zinc-700"
          >
            Agregar Paso
          </Button>
          <ul className="grid gap-2">
            {steps.map((step, index) => (
              <li
                className="flex items-center justify-between rounded-md bg-zinc-800 p-2 px-3 text-sm font-medium"
                key={index}
              >
                <span>
                  {index + 1}. {step}
                </span>
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  className="h-4 w-4"
                  onClick={() => removeStep(index)}
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <ButtonSubmit />
      </form>
    </Form>
  );
};

export default FormRecipe;

const ButtonSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full font-bold" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Guardando Receta
        </>
      ) : (
        "Guardar Receta"
      )}
    </Button>
  );
};
