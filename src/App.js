import * as React from 'react';

const welcome = {
  title: 'React',
  greeting: 'Hey'
};

const reasons = [
  'get a new job',
  'learn new technologies',
];

function getTitle(title) {
  return title;
}

function App() {
  return (
    <div>
      <h1>{welcome.greeting} {getTitle(welcome.title)}!</h1>
      <ul>
        {reasons.map((reason, index) => {
          return <li key={index}>{reason}</li>
        })}
      </ul>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" />
    </div >
  );
}

export default App;
