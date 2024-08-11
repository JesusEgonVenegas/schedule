const SortBySelect = ({ sortBy, setSortBy }) => {
  return (
    <select
      name="sort_by"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="first_name">First Name</option>
      <option value="last_name">Last Name</option>
    </select>
  );
};

export default SortBySelect;
