import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import HeroContainer from './containers/HeroContainer';
import NavContainer from './containers/NavContainer';
import ProfileContainer from './containers/ProfileContainer';
import CrudContainer from './containers/CrudContainer';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return(
      <Router history={browserHistory}>
        <Route path="/" component={NavContainer}>
          <IndexRoute component={HeroContainer} />
          <Route path='user' component={ProfileContainer} />
          <Route path='media' component={CrudContainer} />
          <Route path='media/:id' component={CrudContainer} />
        </Route>
      </Router>
    )
  }
}

export default App;
