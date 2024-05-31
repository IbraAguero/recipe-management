"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FormIngredient from "../../ui/FormIngredient";

const AddIngredientModal = () => {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="p-8 sm:max-w-[425px]">
        <FormIngredient />
      </DialogContent>
    </Dialog>
  );
};

export default AddIngredientModal;
