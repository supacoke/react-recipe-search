import React, { Component } from 'react';

import Home from './pages/Home';
import Recipe from './pages/Recipe';

import Header from './components/Header';

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div id="main" role="main">
              <Route path="/" component={Home} exact />
              <Route path="/recipe" component={Recipe} exact />
              <Route path="/recipe/:recipeId" component={Recipe} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
