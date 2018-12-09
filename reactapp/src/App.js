import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './administrador/admin';
import Main from './component/main';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
          <Route
              path="/Main"
              component={Main} />
            <Route
              path="/Admin"
              component={Admin} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;