"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { deleteIngredient } from "@/lib/actions/ingredients";
import { useToast } from "@/components/ui/use-toast";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ingrediente" />
    ),
    cell: ({ row }) => {
      return <div className="ml-2 font-medium">{row.getValue("name")}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: "Cantidad",
  },
  {
    accessorKey: "measure",
    header: "Medida",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Precio</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(price);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
