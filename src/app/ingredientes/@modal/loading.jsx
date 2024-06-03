import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <Dialog defaultOpen={true} modal>
      <DialogContent className="grid h-96 place-content-center p-8 sm:max-w-[425px]">
        <Loader2 className="h-14 w-14 animate-spin" />
      </DialogContent>
    </Dialog>
  );
};
export default Loader;
