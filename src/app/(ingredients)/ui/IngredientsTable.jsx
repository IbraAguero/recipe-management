import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getIngredients } from "@/lib/actions/ingredients";

const IngredientsTable = async () => {
  const ingredients = await getIngredients();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ingrediente</TableHead>
          <TableHead>Medida</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Funciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ingredients.map((el) => (
          <TableRow key={el.id}>
            <TableCell>{el.name}</TableCell>
            <TableCell>{el.meause}</TableCell>
            <TableCell>{el.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default IngredientsTable;
