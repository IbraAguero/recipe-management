import dynamic from "next/dynamic";

const ModalIngredient = dynamic(() => import("../ui/ModalFormIngredient"), {
  ssr: false,
});

const AddIngredientPage = () => {
  return (
    <>
      <ModalIngredient />
    </>
  );
};

export default AddIngredientPage;
