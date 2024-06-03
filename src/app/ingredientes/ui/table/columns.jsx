"use client";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ingrediente" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-2 w-32 font-medium">{row.getValue("name")}</div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">Cantidad</div>,
    cell: ({ row }) => {
      const quantity = parseInt(row.getValue("quantity"));
      return <div className="text-center">{quantity}</div>;
    },
  },
  {
    accessorKey: "measure",
    header: () => <div className="text-center">Medida</div>,
    cell: ({ row }) => {
      const measure = row.getValue("measure");
      return <div className="text-center">{measure}</div>;
    },
  },
  {
    accessorKey: "pricePerUnit",
    header: () => <div className="text-center">Precio/Unidad</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("pricePerUnit"));

      const formatted = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(price);

      return <div className="text-center font-medium">{formatted}</div>;
    },
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
