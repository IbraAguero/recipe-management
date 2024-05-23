import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const IngredientsModal = () => {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar ingrediente</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              placeHolder="Ingrese un ingrediente"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="meause" className="text-right">
              Medida
            </Label>
            <Select name="meause">
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Eliga una medida" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gramos">Gramos</SelectItem>
                <SelectItem value="mililitros">Mililitros</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="price" className="text-right">
              Precio
            </Label>
            <Input
              id="price"
              placeHolder="Ingrese un precio"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Agregar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default IngredientsModal;
