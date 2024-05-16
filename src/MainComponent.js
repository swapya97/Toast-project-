import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './Component3';
import ToastNotificationContainer from './ToastNotificationContainer';
import './MainComponent.css';

const MainComponent = () => {
  return (
    <Router>
      <div className="main-container">
        <header className="header">
          <h1>Mini Toast Notification Library</h1>
        </header>
        <nav className="nav">
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">
                First Component
              </NavLink>
            </li>
            <li>
              <NavLink to="/second" activeClassName="active">
                Second Component
              </NavLink>
            </li>
            <li>
              <NavLink to="/third" activeClassName="active">
                Third Component
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="body">
          <Switch>
            <Route exact path="/" component={Component1} />
            <Route path="/second" component={Component2} />
            <Route path="/third" component={Component3} />
          </Switch>
        </div>
        <ToastNotificationContainer />
      </div>
    </Router>
  );
};

export default MainComponent;
