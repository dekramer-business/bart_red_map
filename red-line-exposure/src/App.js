import lines from './lines.svg';
import open_circle from './station_circle_open.svg';
import closed_circle from './station_circle_closed.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={lines} className="Lines-back" alt="logo"/>
        <img src={open_circle} className="Station-circle" alt="logo" />
        <img src={closed_circle} className="Station-circle" alt="logo" />
      </header>
    </div>
  );
}

export default App;
