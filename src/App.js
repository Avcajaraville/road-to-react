import * as React from "react";

const InputWithLabel = ({ id, label, value, onInputChange, type = "text" }) => {
  return (
    <>
      <label htmlFor="{id}">{label}</label>
      <input id="{id}" type="{type}" value={value} onChange={onInputChange} />
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
  const handleSearch = (event) => {
    setSeachTerm(event.target.value);
  };

  const searchedStories = stories.filter(
    (story) =>
      searchTerm && story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>{title}</h1>
      <InputWithLabel id="search" label="Search:" value={searchTerm} onInputChange={handleSearch} />
      <p>
        Seaching for: <strong>{searchTerm}</strong>
      </p>
      <List list={searchedStories} />
    </>
  );
};

export default App;
