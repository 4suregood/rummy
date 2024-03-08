import logo from './logo.svg';
import './App.css';
// import PlayingTable from './components/PlayingTable';
import PlayingTable from './dndkit/PlayingTable';
import Dimension from './Dimension';
function App() {
  console.log("App");
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <PlayingTable />
      <Dimension />
    </div>
  );
}

export default App;
