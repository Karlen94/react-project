import logo from './logo.svg';
import './App.css';
import User from './User';
import PageInformation from './Page_information';
import SensMessage from './Get_message';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <User name='Karlen' surname='Karapetyan' />
        <img src={logo} className="App-logo" alt="logo" />
        <PageInformation />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <SensMessage />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
