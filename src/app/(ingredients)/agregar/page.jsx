import { formSchema } from "@/schemas/FormIngredientSchema";

import dynamic from "next/dynamic";

const Modal = dynamic(() => import("../ModalFormIngredient"), { ssr: false });

const AddIngredientPage = () => {
  return (
    <>
      <Modal />
    </>
  );
};

export default AddIngredientPage;
