import * as React from 'react';

const Search = (props) => {
  console.log('Rendering Search');
  const [searchTerm, setSeachTerm] = React.useState('');
  const handleChange = (event) => {
    setSeachTerm(event.target.value)
    props.onSearch(event);
  };

  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={handleChange} onBlur={handleChange} />
      <p>
        Seaching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );

}

const List = (props) => {
  console.log('Rendering List');
  return <ul>
    {props.list.map((item) =>
      <Item key={item.objectId} item={item} />
    )}
  </ul>
}

const Item = (props) => {
  console.log('Rendering Item');
  return <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
}

const App = () => {
  console.log('Rendering App');
  const title = 'My hacker stories';
  const stories = [{
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
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>{title}</h1>
      <Search onSearch={handleChange}/>
      <List list={stories} />
    </div >
  );
}

export default App;
