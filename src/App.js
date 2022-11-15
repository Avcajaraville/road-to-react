import * as React from "react";

const Search = ({ search, onSearch }) => {
  return (
    <>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </>
  );
};

const List = ({ list }) => {
  return (
    <ul>
      {list.map(({ objectId, ...item }) => (
        <Item key={objectId} {...item} />
      ))}
    </ul>
  );
};

const Item = ({ author, title, url, num_comments, points }) => {
  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </li>
  );
};

const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) ?? initialValue
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

const App = () => {
  const title = "My hacker stories";
  const stories = [
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
  ];

  const [searchTerm, setSeachTerm] = useLocalStorageState("search", "React");
  const handleChange = (event) => {
    setSeachTerm(event.target.value);
  };

  const searchedStories = stories.filter(
    (story) =>
      searchTerm && story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>{title}</h1>
      <Search onSearch={handleChange} search={searchTerm} />
      <p>
        Seaching for: <strong>{searchTerm}</strong>
      </p>
      <List list={searchedStories} />
    </>
  );
};

export default App;
