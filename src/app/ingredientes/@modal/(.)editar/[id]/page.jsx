import { getIngredient } from "@/lib/actions/ingredients";
import EditModal from "./ui/EditModal";

const EditIngredientModal = async ({ params }) => {
  const ingredient = await getIngredient(params.id);

  return <EditModal ingredient={ingredient} />;
};

export default EditIngredientModal;
