import React, { Component } from 'react'
import { Link } from 'react-router'

class FollowContainer extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getUserData()
  }

  // get all users from user api controller - index
  getUserData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ allUsers: responseData.users })
    });
  }

  render() {
    return(
      <div>
      </div>
    )
  }
}

export default FollowContainer
