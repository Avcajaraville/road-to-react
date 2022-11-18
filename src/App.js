import * as React from "react";

const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) ?? initialValue
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

const getAsyncStories = async () =>
  new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        data: {
          stories: [
            {
              title: "React",
              url: "https://reactjs.org",
              author: "Jordan Walke",
              num_comments: 3,
              points: 4,
              objectId: 0,
            },
            {
              title: "Redux",
              url: "https://redux.js.org",
              author: "Dan Abramov, Andrew Clark",
              num_comments: 2,
              points: 5,
              objectId: 1,
            },
          ],
        },
      });
    }, 3000);
  });

const App = () => {
  const title = "My hacker stories";
  const [searchTerm, setSeachTerm] = useLocalStorageState("search", "React");
  const handleSearch = (event) => {
    setSeachTerm(event.target.value);
  };
  const [stories, setStories] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const response = await getAsyncStories();
      setStories(response.data.stories);
    })();
  }, []);
  const searchedStories = stories.filter(
    (story) =>
      searchTerm && story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const removeStories = (item) => {
    const newStories = stories.filter(
      (story) => story.objectId !== item.objectId
    );
    setStories(newStories);
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
      <List list={searchedStories} onRemove={removeStories} />
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
        <Item key={item.objectId} item={item} onRemove={onRemove} />
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
