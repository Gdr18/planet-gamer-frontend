import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import Contact from "./pages/contact";
import Products from "./pages/products";
import Game from "./pages/game";
import Checkout from './pages/checkout';
import NoMatch from './pages/no-match';
import GameManager from './pages/game-manager';
import Profile from './pages/profile';

import { useLoginContext } from '../contexts/login-context';

export default function App() {
    const { loggedUser } = useLoginContext();

    return (
        <div className='app'>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/p/:platform" component={Products} />
                    <Route path="/g/:game" component={Game} />
                    <Route path="/contact" component={Contact} />
                    {loggedUser ? (<Route path={`/profile/${loggedUser.id}`} component={Profile} />) : null}
                    {loggedUser ? (<Route path={`/checkout/${loggedUser.id}`} component={Checkout} />) : null}
                    {loggedUser.admin ? (<Route path={`/game-manager/${loggedUser.id}`} component={GameManager} />) : null}
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </div>
    );
}
