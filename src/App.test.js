import { fireEvent, render, screen } from "@testing-library/react";
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

  it("show errror message when error fetching data", async () => {
    const fetchPromise = Promise.resolve({
      json: () => Promise.reject(),
    });
    global.fetch = jest.fn(() => fetchPromise);
    render(<App />);
    expect(screen.queryByText(/Fetching data.../)).toBeInTheDocument();
    try {
      await act(() => fetchPromise);
    } catch (error) {
      expect(screen.queryByText(/Fetching data.../)).toBeNull();
      expect(screen.getByText("Unexpected error!")).toBeInTheDocument();
    }
  });

  it("removes a story", async () => {
    const fetchPromise = Promise.resolve({
      json: () =>
        Promise.resolve({
          hits: stories,
        }),
    });
    global.fetch = jest.fn(() => fetchPromise);
    render(<App />);
    await act(() => fetchPromise);
    expect(screen.getAllByRole("listitem").length).toBe(stories.length);
    expect(screen.queryByText(story1.author)).toBeInTheDocument();
    fireEvent.click(screen.getAllByLabelText("Dismiss")[0]);
    expect(screen.getAllByRole("listitem").length).toBe(stories.length - 1);
    expect(screen.queryByText(story1.author)).toBeNull();
  });

  it("searched for an specifc story", async () => {
    const reactPromise = Promise.resolve({
      json: () =>
        Promise.resolve({
          hits: stories,
        }),
    });
    const anotherStory = {
      title: "Cabesapp",
      url: "http://www.cabesapp.com",
      author: "Antonio Vázquez",
      num_comments: 12,
      points: 2,
      objectID: 4,
    };
    const cabesappPromise = Promise.resolve({
      json: () =>
        Promise.resolve({
          hits: stories,
        }),
    });

    global.fetch = jest.fn((url) => {
      if (url.includes("React")) {
        return reactPromise;
      }

      if (url.includes(anotherStory.title)) {
        return cabesappPromise;
      }
      throw new Error();
    });
    render(<App />);
    await act(() => reactPromise);
    expect(screen.queryByText(story1.author)).toBeInTheDocument();
    expect(screen.queryByText(anotherStory.author)).toBeNull();
    fireEvent.change(screen.getByDisplayValue("React"), {
      target: {
        value: anotherStory.title,
      },
    });
    expect(screen.queryByDisplayValue("React")).toBeNull();
    expect(screen.queryByDisplayValue(anotherStory.title)).toBeInTheDocument();
    fireEvent.submit(screen.queryByText("Search"));
    await act(() => cabesappPromise);

    expect(screen.queryByText(story1.author)).toBeInTheDocument();
    expect(screen.queryByText(anotherStory.author)).toBeNull();
  });
});
