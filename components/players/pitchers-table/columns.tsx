"use client";

import { IPitcher } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IPitcher>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];
