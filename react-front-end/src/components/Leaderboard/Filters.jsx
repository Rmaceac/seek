import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { useState } from "react";

const filters = [
  "Total Score",
  "Name",
  "Games Played",
  "Last Game Score",
  "Last Week Score",
];

export default function Filters() {
  const [filter, setFilter] = useState("")

  const handleChange = (event) => {
    setFilter(event.target.value);
    // filter function goes here
  }

  return (
    <div>
      <FormControl sx={{ width: 300 }} size="small">
        <InputLabel id="simple-select-label">Filter By...</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={filter}
          label="LdrBoard Filter"
          onChange={handleChange}
        >
          {filters.map(filter => (
            <MenuItem value={filter}>{filter}</MenuItem>
          ))};
        </Select>
      </FormControl>
    </div>
      
  );


}