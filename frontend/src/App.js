import logo from './logo.svg';
import './App.css';
import './main.scss';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import SearchPage from './Components/Search.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={SearchPage}> </Route>
            <Route> </Route>
            <Route path="/" render={() => <div> 404 </div>}> </Route>
          </Switch>
        </BrowserRouter>

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
      </header>
    </div>
  );
}

export default App;
