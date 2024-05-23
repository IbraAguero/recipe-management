"use client";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormIngredient from "../../ui/FormIngredient";

const AddQuoteModal = () => {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="p-8 sm:max-w-[425px]">
        <FormIngredient />
      </DialogContent>
    </Dialog>
  );
};

export default AddQuoteModal;
