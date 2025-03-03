import React, { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface MultiSelectProps {
  field?: any;
  options: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export default function MultiSelect({
  field,
  options,
  defaultValue,
  onValueChange,
}: MultiSelectProps) {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(
    defaultValue || []
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: { value },
    } = event;

    onValueChange &&
      onValueChange(typeof value === "string" ? value.split(",") : value);

    field?.onChange(typeof value === "string" ? value.split(",") : value);

    setSelectedItems(typeof value === "string" ? value.split(",") : value);
  };

  // useEffect(() => {
  //   onValueChange && onValueChange(selectedItems);
  //   field?.onChange(selectedItems);
  // }, [selectedItems]);

  return (
    <Select
      multiple
      {...field}
      size="small"
      value={selectedItems}
      onChange={handleChange}
      labelId="demo-multiple-name-label"
      sx={{
        bgcolor: "white",
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
