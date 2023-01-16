import { InputWithLabel } from "./InputWithLabel";

export const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => {
  return (
    <form onSubmit={onSearchSubmit} className="search-form">
      <InputWithLabel
        id="search"
        label="Search:"
        value={searchTerm}
        onInputChange={onSearchInput}
      >
        Search:
      </InputWithLabel>
      <button
        className="button button--large"
        type="submit"
        disabled={!searchTerm}
      >
        Search
      </button>
    </form>
  );
};
