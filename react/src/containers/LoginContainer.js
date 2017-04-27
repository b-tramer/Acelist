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
      <div className="facebook-react-page">
        <center> <h1> Login With Facebook </h1> </center>
      </div>

    )
  }
}

export default LoginContainer
