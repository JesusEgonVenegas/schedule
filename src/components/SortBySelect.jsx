import { useCallback } from "react";

const SortBySelect = ({ sortBy, setSortBy }) => {
  const changeSort = useCallback(
    (e) => {
      setSortBy(e.target.value);
    },
    [setSortBy],
  );
  return (
    <select name="sort_by" value={sortBy} onChange={changeSort}>
      <option value="first_name">First Name</option>
      <option value="last_name">Last Name</option>
    </select>
  );
};

export default SortBySelect;
