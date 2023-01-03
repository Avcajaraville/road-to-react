import * as React from "react";
import { ReactComponent as Check } from "./check.svg";

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

const storiesReducer = (state, action) => {
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

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => {
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

const InputWithLabel = ({
  id,
  value,
  onInputChange,
  type = "text",
  children,
}) => {
  return (
    <>
      <label htmlFor={id} className="label">
        {children}
      </label>
      <input
        className="input"
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
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

const Item = ({ item, onRemove }) => {
  return (
    <li className="item">
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button className="button button--small" onClick={() => onRemove(item)}>
          <Check />
        </button>
      </span>
    </li>
  );
};

export default App;
