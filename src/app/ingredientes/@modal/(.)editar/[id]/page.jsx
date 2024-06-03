import { getIngredient } from "@/lib/actions/ingredients";
import ModalFormIngredient from "@/app/ingredientes/ui/ModalFormIngredient";

export const dynamic = "force-dynamic";

const EditIngredientModal = async ({ params }) => {
  const ingredient = await getIngredient(params.id);

  return <ModalFormIngredient ingredient={ingredient} />;
};

export default EditIngredientModal;
