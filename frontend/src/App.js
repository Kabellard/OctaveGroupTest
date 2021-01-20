import './App.css';
import './main.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SearchPage from './Views/SearchPageView.js';
import ArtistAlbumsPage from './Views/ArtistAlbumsPageView';
import React from "react";
import LoginPage from "./Views/LoginPageView";

function App() {
    return (
        <div className="App">

            <header>
                <section className="hero is-success has-text-left">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Spotify Artist Search
                            </h1>
                        </div>
                    </div>
                </section>
            </header>

            <BrowserRouter >
                <div className="container"
                     style={{
                         backgroundColor: "#282c34"
                     }}
                >
                    <Switch>
                        <Route exact path="/" component={LoginPage}/>
                        <Route path={["/artistSearch/:searchTerms", "/artistSearch"]}>
                            <SearchPage/>
                        </Route>
                        <Route path="/albums/:artistId" component={ArtistAlbumsPage}/>
                        <Route path="/" render={() => <div> 404 </div>}/>
                    </Switch>
                </div>
            </BrowserRouter>

        </div>
    );
}

export default App;
