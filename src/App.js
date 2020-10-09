import React, { Component } from 'react';
import './App.css';
import Navbar from './navigation/NavBar'
import Sort from './sort/Sort';
import Search from'./search/Search';
import Pathfind from './pathfind/Pathfind';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

const App =  () => {
    return (
      <Router>
        <Navbar/>
        <AnimatedSwitch />
      </Router>
    );
  }

function Home() {
  return (
  <div className="container">
    <div id="home">
        <h1>Algorithm Visualization</h1>
        <div className="routeButton"><Link to='/sort'><button>Sort</button></Link></div>
        <div className="routeButton"><Link to='/search'><button>Search</button></Link></div>
        <div className="routeButton"><Link to='/pathfind'><button>Pathfind</button></Link></div>
    </div>
  </div>);
}

const AnimatedSwitch = withRouter(({location}) => (
  <TransitionGroup>
        <CSSTransition 
          key={location.key} 
          classNames="page" 
          timeout={1000}
        >
          <Switch>
            <Route path="/sort">
              <Sort />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/pathfind">
              <Pathfind />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </CSSTransition>
    </TransitionGroup>
));

export default App;