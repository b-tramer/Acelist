import React, { Component } from 'react';
import { Link } from 'react-router';

class LoginContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }


  render() {
    return(
      <div className="column row">
        <div className="facebook-react-page" id="user-widget">
          <h3> <a id="sign_in" href="/auth/facebook">Sign in with Facebook</a> </h3>
          <h3> <a id="sign_out" href="/signout">Sign out</a> </h3>
        </div>
      </div>
    )
  }
}

export default LoginContainer
