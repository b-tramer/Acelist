import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import HeroContainer from './containers/HeroContainer';
import NavContainer from './containers/NavContainer';
import MainContainer from './containers/MainContainer';
import LoginContainer from './containers/LoginContainer';
import AllUsersContainer from './containers/AllUsersContainer';
import MediaShowContainer from './containers/MediaShowContainer';

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
          <Route path='login' component={() => (<LoginContainer user={this.props.user} />)}/>
          <Route path='users' component={AllUsersContainer} />
          <Route path='users/:id' component={MainContainer} />
          <Route path='media' component={MainContainer} />
          <Route path='media/:id' component={MediaShowContainer} />
        </Route>
      </Router>
    )
  }
}

export default App;
