import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

// Users Table
export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "role",
    header: "Função",
  },
];

// Properties Table
export type Property = {
  id: number;
  title: string;
  address: string;
  price: string;
  type: string;
  status: string;
};

export const propertyColumns: ColumnDef<Property>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "address",
    header: "Endereço",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

// Payments Table
export type Payment = {
  id: number;
  user: string;
  property: string;
  amount: string;
  date: string;
  status: string;
};

export const paymentColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "property",
    header: "Imóvel",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

// Schedules Table
export type Schedule = {
  id: number;
  user: string;
  property: string;
  date: string;
  time: string;
  type: string;
  status: string;
};

export const scheduleColumns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "property",
    header: "Imóvel",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "time",
    header: "Horário",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];