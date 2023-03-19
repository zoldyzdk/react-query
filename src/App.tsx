import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PagesQuery from "./PagesQuery";

function App() {
const [count, setCount] = useState(0);
const [data, setData] = useState([]);
const [isActive, setIsActive] = useState(false);
const [page, setPage] = useState(1);

  const onClick = async () => {
    setIsActive(true);
      await fetch('https://jsonplaceholder.typicode.com/posts')
          .then((response) => response.json())
          .then((data) => setData(data))
  }

  const Cards = () => {

    return (
      <ol>
        {
          (isActive) ? data
                  .slice(page, page + 20)
                  .map((i: {id: number, title: string}) => <li key={`${i.id}`}>{i.title}</li>)
          : null
        }
      </ol>
    )
  };


const Pages = () => {
  const i = data.length / 20;
  const arr = new Array(i).fill(0);

  return (
    <div>
      { (isActive) ?
          arr.map((_value, index) => (
        <button onClick={() => setPage(index)}>{index + 1}</button>
      ))
      : null
      }
    </div>
  );
};

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/*<Pages />*/}
      {/*<button onClick={onClick}>GET!</button>*/}
      {/*<button onClick={() => setIsActive(false)}>Erase GET</button>*/}
      {/*<Cards />*/}
      <PagesQuery />
    </div>
  )
}

export default App
