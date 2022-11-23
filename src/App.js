import * as React from "react";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) ?? initialValue
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
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

const getAsyncStories = async (query) => {
  const data = await fetch(`${API_ENDPOINT}${query}`);
  return data.json();
};

const App = () => {
  const title = "My hacker stories";
  const [searchTerm, setSeachTerm] = useLocalStorageState("search", "React");
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  React.useEffect(() => {
    (async () => {
      dispatchStories({
        type: "STORIES_FETCHING",
      });
      try {
        const response = await getAsyncStories(searchTerm);
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
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSeachTerm(event.target.value);
  };

  const removeStories = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  return (
    <>
      <h1>{title}</h1>
      <InputWithLabel
        id="search"
        label="Search:"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        Search:
      </InputWithLabel>
      <p>
        Seaching for: <strong>{searchTerm}</strong>
      </p>
      {stories.isLoading && <p>Fetching data...</p>}
      {stories.isError && <p>Unexpected error!</p>}
      <List list={stories.data} onRemove={removeStories} />
    </>
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
      <label htmlFor="{id}">{children}</label>
      <input id="{id}" type="{type}" value={value} onChange={onInputChange} />
    </>
  );
};

const List = ({ list, onRemove }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
};

const Item = ({ item, onRemove }) => {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button onClick={() => onRemove(item)}>Remove item</button>
      </span>
    </li>
  );
};

export default App;
