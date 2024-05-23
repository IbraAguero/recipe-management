import { Button, buttonVariants } from "@/components/ui/button";
import IngredientsTable from "./ui/IngredientsTable";
import Link from "next/link";

export default async function HomePage() {
  return (
    <>
      <section className="container mt-5 flex flex-col items-center justify-center">
        <div className="mb-5 flex w-full justify-between">
          <h2 className="text-2xl font-bold tracking-tighter">Ingredientes</h2>
          <Link href={"/agregar"} className={buttonVariants()}>
            Agregar
          </Link>
        </div>
        <IngredientsTable />
      </section>
    </>
  );
}
