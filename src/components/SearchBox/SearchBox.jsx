import css from "./SearchBox.module.css";
export default function SearchBox({ value, onFilter }) {
  const handleFilter = evt => {
    onFilter(evt.target.value);
  };
  return (
    <div className={css.search}>
      <p>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={handleFilter}
      />
    </div>
  );
}
