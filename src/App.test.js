import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "./App";
import { story1, story2, stories } from "./stories";

describe("App", () => {
  it("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/My hacker stories/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("succeeds fetching data", async () => {
    const fetchPromise = Promise.resolve({
      json: () =>
        Promise.resolve({
          hits: stories,
        }),
    });
    global.fetch = jest.fn(() => fetchPromise);
    render(<App />);
    expect(screen.queryByText(/Fetching data.../)).toBeInTheDocument();
    await act(() => fetchPromise);
    expect(screen.queryByText(/Fetching data.../)).toBeNull();
    expect(screen.getByText(story1.author)).toBeInTheDocument();
    expect(screen.getByText(story2.author)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(stories.length);
  });
});
