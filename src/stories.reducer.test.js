import { storiesReducer } from "./stories.reducer";
import { story1, story2, stories } from "./stories";

describe("storiesReducer", () => {
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
