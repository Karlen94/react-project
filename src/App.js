import logo from './logo.svg';
import './App.css';
// import User from './User';
// import PageInformation from './Page_information';
// import SensMessage from './Get_message';
// import Product from './homework_7/Product';
import ToDo from './homework_8/ToDoList';



function App() {


  return (
    <div className="App">
      <header className="App-header">


        <ToDo />



        {/* <User name='Karlen' surname='Karapetyan' />
        <div>
          1:<h3>This is an example of advertising</h3>
          <Product
            name='Mercedes S-Class W223 '
            price={100000}
            description='Germany - Sindelfingen' />

        </div>

        <div>
          2:<h3>This is an example of advertising</h3>
          <Product
            name='Mercedes S-Class W223'
            price={108708}
            description='Germany - Sindelfingen' />
        </div>
 */}
        <img src={logo} className="App-logo" alt="logo" />
        {/*<PageInformation />*/}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/*<SensMessage />*/}
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
