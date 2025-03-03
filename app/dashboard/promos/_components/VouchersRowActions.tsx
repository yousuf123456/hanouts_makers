"use client";

import { Delete, Edit, MoreHorizontal, Star } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaQuestion } from "react-icons/fa";
import { routes } from "@/app/_config/routes";

interface DataTableRowActionsProps<TData> {
  row: any;
}

export function VouchersRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[220px]">
        <Link href={routes.editVoucher(row.original.bucketId, row.original.id)}>
          <DropdownMenuItem className="justify-between py-3">
            Edit <Edit className="w-4 h-4" />
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="justify-between py-3">
          Delete <Delete className="w-5 h-5 text-red-600" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
