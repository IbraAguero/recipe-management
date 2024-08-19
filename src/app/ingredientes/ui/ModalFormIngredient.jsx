"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import FormIngredient from "./FormIngredient";

const ModalFormIngredient = ({
  ingredient,
  isSrr,
  isDialog,
  open,
  handleClose,
}) => {
  const router = useRouter();

  const handleDialogClose = () => {
    if (isDialog) {
      handleClose();
    } else {
      if (isSrr) {
        router.push("/ingredientes");
      } else {
        router.back();
      }
    }
  };

  return (
    <Dialog
      open={open}
      defaultOpen={!isDialog}
      onOpenChange={handleDialogClose}
    >
      <DialogContent className="p-8 sm:max-w-[425px]">
        <FormIngredient
          ingredient={ingredient}
          closeDialog={handleDialogClose}
        />
      </DialogContent>
    </Dialog>
  );
};
export default ModalFormIngredient;
