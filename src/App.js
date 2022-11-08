import * as React from "react";

const Search = (props) => {
  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input
        id="search"
        type="text"
        value={props.search}
        onChange={props.onSearch}
      />
    </div>
  );
};

const List = (props) => {
  return (
    <ul>
      {props.list.map((item) => (
        <Item key={item.objectId} item={item} />
      ))}
    </ul>
  );
};

const Item = (props) => {
  return (
    <li>
      <span>
        <a href={props.item.url}>{props.item.title}</a>
      </span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>
    </li>
  );
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

  const [searchTerm, setSeachTerm] = React.useState("React");
  const handleChange = (event) => {
    setSeachTerm(event.target.value);
  };
  const searchedStories = stories.filter(story => searchTerm && story.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h1>{title}</h1>
      <Search onSearch={handleChange} search={searchTerm} />
      <p>
        Seaching for: <strong>{searchTerm}</strong>
      </p>
      <List list={searchedStories} />
    </div>
  );
};

export default App;
