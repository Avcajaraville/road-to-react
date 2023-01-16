import { fireEvent, render, screen } from "@testing-library/react";
import { Item } from "./Item";
import { story1 } from "./stories";

describe("Item component", () => {
  it("renders all properties", () => {
    render(<Item item={story1} />);
    expect(screen.getByText(story1.author)).toBeInTheDocument();
    expect(screen.getByText(story1.title)).toHaveAttribute("href", story1.url);
  });

  it("renders a clickable button", () => {
    render(<Item item={story1} />);
    expect(screen.getByRole("button"));
  });

  it("dismiss button call click handler", () => {
    const onRemoveSpy = jest.fn();
    render(<Item item={story1} onRemove={onRemoveSpy} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onRemoveSpy).toHaveBeenCalled();
  });
});
