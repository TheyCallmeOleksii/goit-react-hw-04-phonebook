export const Filter = ({ filter, onChange }) => {
  return (
    <label>
      Find contacts by name:
      <input onChange={onChange} value={filter} type="text" name="filter" />
    </label>
  );
};
