import { buttonVariants } from "@/components/ui/button";
import IngredientsTable from "./ui/IngredientsTable";
import Link from "next/link";
import SkeletonTable from "./ui/table/skeleton-table";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <>
      <section className="mt-12 flex flex-col items-center justify-center px-2 sm:px-6 md:px-12 lg:px-24">
        <div className="mb-5 flex w-full justify-between px-4">
          <h1 className="text-2xl font-bold tracking-tighter">Ingredientes</h1>
          <Link href={"/ingredientes/agregar"} className={buttonVariants()}>
            Agregar
          </Link>
        </div>
        <Suspense fallback={<SkeletonTable />}>
          <IngredientsTable />
        </Suspense>
      </section>
    </>
  );
}
