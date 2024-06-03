import { getIngredient } from "@/lib/actions/ingredients";
import dynamic from "next/dynamic";

const ModalIngredient = dynamic(() => import("../../ui/ModalFormIngredient"), {
  ssr: false,
});

const EditIngredientPage = async ({ params }) => {
  const ingredient = await getIngredient(params.id);
  return <ModalIngredient ingredient={ingredient} isSrr={true} />;
};

export default EditIngredientPage;
