import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  title,
  column,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const canSort = column.getCanSort();
  const canHide = column.getCanHide();

  useEffect(() => {
    console.log(column.getSortIndex());
  }, [column]);
  if (!canSort && !canHide) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-4 h-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ChevronsUpDown className="w-4 h-4" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuItem
            disabled={!canSort}
            onClick={() => column.clearSorting()}
          >
            <X className="h-3.5 w-3.5 text-muted-foreground/70" />
            Clear Sort
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={!canSort}
            className={cn(column.getIsSorted() === "asc" && "bg-accent")}
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={!canSort}
            className={cn(column.getIsSorted() === "desc" && "bg-accent")}
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70 " />
            Desc
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={!canHide}
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
