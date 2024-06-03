import { getIngredients } from "@/lib/actions/ingredients";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";

const IngredientsTable = async () => {
  const ingredients = await getIngredients();

  return (
    <>
      <DataTable data={ingredients || []} columns={columns} />
    </>
  );
};
export default IngredientsTable;
