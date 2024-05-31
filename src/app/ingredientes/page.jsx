import {  buttonVariants } from "@/components/ui/button";
import IngredientsTable from "./ui/IngredientsTable";
import Link from "next/link";

export default async function HomePage() {
  const handleClick = () => {};

  return (
    <>
      <section className="container mt-12 flex flex-col items-center justify-center px-24">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-2xl font-bold tracking-tighter">Ingredientes</h1>
          <Link href={"/ingredientes/agregar"} className={buttonVariants()}>
            Agregar
          </Link>
        </div>
        <IngredientsTable />
      </section>
    </>
  );
}
