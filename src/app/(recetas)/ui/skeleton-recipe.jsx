import { Skeleton } from "@/components/ui/skeleton";

const SkeletonRecipe = () => {
  return (
    <div className="mt-12 flex flex-col gap-4">
      <Skeleton className="h-6 w-[250px]" />
      <hr />
      <Skeleton className="h-6 w-[200px]" />
      <hr />

      <Skeleton className="h-6 w-[280px]" />
      <hr />

      <Skeleton className="h-6 w-[220px]" />
      <hr />

      <Skeleton className="h-6 w-[250px]" />
      <hr />

      <Skeleton className="h-6 w-[200px]" />
      <hr />
    </div>
  );
};
export default SkeletonRecipe;
