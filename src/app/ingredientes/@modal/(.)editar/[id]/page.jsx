import { getIngredient } from "@/lib/actions/ingredients";
import ModalFormIngredient from "@/app/ingredientes/ui/ModalFormIngredient";

const EditIngredientModal = async ({ params }) => {
  const ingredient = await getIngredient(params.id);

  return <ModalFormIngredient ingredient={ingredient} />;
};

export default EditIngredientModal;
