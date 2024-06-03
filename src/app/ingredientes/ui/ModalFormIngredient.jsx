"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import FormIngredient from "./FormIngredient";

const ModalFormIngredient = ({ ingredient, isSrr }) => {
  const router = useRouter();

  const handleClose = () => {
    if (isSrr) {
      router.push("/ingredientes");
    } else {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={handleClose}>
      <DialogContent className="p-8 sm:max-w-[425px]">
        <FormIngredient ingredient={ingredient} />
      </DialogContent>
    </Dialog>
  );
};
export default ModalFormIngredient;
