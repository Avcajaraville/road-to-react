import * as React from "react";
import { Item } from "./Item";
import { SearchForm } from "./SearchForm";
import { storiesReducer } from "./stories.reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const useLocalStorageState = (key, initialValue) => {
  const isMounted = React.useRef(false);
  const [value, setValue] = React.useState(
    localStorage.getItem(key) ?? initialValue
  );

  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
};

const getAsyncStories = async (url) => {
  const data = await fetch(url);
  return data.json();
};

const App = () => {
  const title = "My hacker stories";
  const [searchTerm, setSeachTerm] = useLocalStorageState("search", "React");
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStories = React.useCallback(() => {
    (async () => {
      dispatchStories({
        type: "STORIES_FETCHING",
      });
      try {
        const response = await getAsyncStories(url);
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: response.hits,
        });
      } catch (err) {
        dispatchStories({
          type: "STORIES_FETCH_ERROR",
        });
      }
    })();
  }, [url]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInputChange = (event) => {
    setSeachTerm(event.target.value);
  };

  const handleRemoveStories = React.useCallback((item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  }, []);

  const getSumComments = (stories) =>
    stories.data.reduce((result, value) => (result += value.num_comments), 0);
  const numComments = React.useMemo(() => getSumComments(stories), [stories]);

  return (
    <div className="container">
      <h1 className="h1">{title}</h1>
      <h2>Total comments: {numComments}</h2>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInputChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <p>
        Seaching for: <strong>{searchTerm}</strong>
      </p>
      {stories.isLoading && <p>Fetching data...</p>}
      {stories.isError && <p>Unexpected error!</p>}
      {!stories.isLoading && (
        <List list={stories.data} onRemove={handleRemoveStories} />
      )}
    </div>
  );
};

const List = React.memo(({ list, onRemove }) => {
  return (
    <ul className="list">
      {list.map((item) => (
        <Item key={item.objectID} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
});

export default App;
