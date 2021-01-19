import logo from './logo.svg';
import './App.css';
import './main.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SearchPage from './Views/SearchPageView.js';
import ArtistAlbumsPage from './Views/ArtistAlbumsPageView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SearchPage} />
            <Route path="/artistSearch/:searchTerms">
              <SearchPage />
            </Route>
            <Route path="/albums/:artistId" component={ArtistAlbumsPage} />
            <Route path="/" render={() => <div> 404 </div>} />
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
