"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const ModalFormIngredient = () => {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent>nossr</DialogContent>
    </Dialog>
  );
};
export default ModalFormIngredient;
