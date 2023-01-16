export const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCHING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case "REMOVE_STORY":
      console.log("REMOVE_STORY");
      return {
        ...state,
        data: state.data.filter(
          (story) => story.objectID !== action.payload.objectID
        ),
        isLoading: false,
        isError: false,
      };
    case "STORIES_FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error(`action ${action.type} not recognized`);
  }
};
