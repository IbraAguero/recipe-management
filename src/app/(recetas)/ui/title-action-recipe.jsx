import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const TitleActionRecipe = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Mis recetas</h1>
        <Link href="/agregar" className={buttonVariants()}>
          Agregar
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Buscar recetas..."
          className="h-10 w-[150px] lg:w-[250px]"
        />
        <Button variant="outline" className="h-10">
          Buscar
        </Button>
      </div>
    </div>
  );
};
export default TitleActionRecipe;
