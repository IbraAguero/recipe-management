import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getIngredients } from "@/lib/actions/ingredients";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";

const IngredientsTable = async () => {
  const ingredients = await getIngredients();

  console.log(ingredients);
  return (
    <>
      <DataTable data={ingredients} columns={columns} />
    </>
  );
};
export default IngredientsTable;
