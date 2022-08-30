import * as React from 'react';

const title = 'My hacker stories';

const list = [{
  title: 'React',
  url: 'https://reactjs.org',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectId: 0,
}, {
  title: 'Redux',
  url: 'https://redux.js.org',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectId: 1,
}];

const Search = () => {
  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
  }
  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={handleChange} onBlur={handleChange} />
    </div>
  );

}

const List = () => (
  <ul>
    {list.map((item) =>
      <li key={item.objectId}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </li>
    )}
  </ul>)

const App = () => (
  <div>
    <h1>{title}</h1>
    <Search />
    <List />
  </div >
);

export default App;
