import dynamic from "next/dynamic";

const Modal = dynamic(() => import("../ui/ModalFormIngredient"), {
  ssr: false,
});

const EditIngredientPage = () => {
  return (
    <>
      <Modal />
    </>
  );
};

export default EditIngredientPage;
