import React, { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface MultiSelectProps {
  field?: any;
  label: string;
  options: string[];
  placeHolder?: string;
}

export default function MultiSelect({
  field,
  label,
  options,
  placeHolder,
}: MultiSelectProps) {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    field.onChange(selectedItems);
  }, [selectedItems]);

  return (
    <Select
      multiple
      {...field}
      size="small"
      value={selectedItems}
      onChange={handleChange}
      labelId="demo-multiple-name-label"
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
