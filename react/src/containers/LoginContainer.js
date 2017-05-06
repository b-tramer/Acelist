import React, { Component } from 'react';
import { Link } from 'react-router';

class LoginContainer extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getUserData()
  }

  // get current user info - check to see if they are logged in
  getUserData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ userId: responseData.current_user.id, userImage: responseData.current_user.image, userName: responseData.current_user.name  })
    });
  }

  render() {
    let profilePicture = this.state.userImage + "/picture?type=large"
    let loginDisplay;
    if (this.state.userImage) {
      loginDisplay =  <div className='login-display'> <img src={profilePicture} width="100px"/>
      <h3> You are signed in as {this.state.userName} </h3>
      <h3> <a id="sign_out" href="/signout">Sign out</a> </h3> </div>
    } else {
      loginDisplay = <h3> <a id="sign_in" href="/auth/facebook"><img src='./facebook.png' width="300px"/></a> </h3>
    }
    return(
      <div id="fb-login">
        <div className="facebook-react-page" id="user-widget">
          {loginDisplay}
        </div>
      </div>
    )
  }
}

export default LoginContainer
