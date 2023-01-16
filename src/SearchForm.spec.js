import { fireEvent, render, screen } from "@testing-library/react";
import { SearchForm } from "./SearchForm";

describe("SearchForm", () => {
  const props = {
    searchTerm: "Initial search term",
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };
  const searchTermUpdated = "This is another search term";

  it("renders input field with proper values", () => {
    render(<SearchForm {...props} />);
    expect(screen.getByDisplayValue(props.searchTerm)).toBeInTheDocument();
  });

  it("renders correct label", () => {
    render(<SearchForm {...props} />);
    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
  });

  it("calls onSearchInput on input value changes", () => {
    render(<SearchForm {...props} />);
    fireEvent.change(screen.getByDisplayValue(props.searchTerm), {
      target: {
        value: searchTermUpdated,
      },
    });
    expect(props.onSearchInput).toHaveBeenCalledTimes(1);
  });

  it("calls onSearchSubmit on form submission", () => {
    render(<SearchForm {...props} />);
    fireEvent.submit(screen.getByRole("button"));
    expect(props.onSearchSubmit).toHaveBeenCalledTimes(1);
  });
});
