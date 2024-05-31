"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const EditModal = ({ ingredient }) => {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="p-8 sm:max-w-[425px]">
        EDITANDOOOO
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
