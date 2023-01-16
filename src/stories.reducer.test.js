import { storiesReducer } from "./stories.reducer";

describe("storiesReducer", () => {
  const story1 = {
    title: "React",
    url: "http://reactjs.org",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  };
  const story2 = {
    title: "Redux",
    url: "http://redux.js.org",
    author: "Dan Abramov, Andrew Clarke",
    num_comments: 2,
    points: 5,
    objectID: 1,
  };
  const stories = [story1, story2];

  describe("remove action", () => {
    it("should remove a story from all stories", () => {
      const action = { type: "REMOVE_STORY", payload: story1 };
      const state = {
        data: stories,
        isLoading: false,
        isError: false,
      };
      const newState = storiesReducer(state, action);
      const expectedState = {
        data: [story2],
        isLoading: false,
        isError: false,
      };
      expect(newState).toStrictEqual(expectedState);
    });
  });
});
