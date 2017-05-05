import React, { Component } from 'react';
import { Link } from 'react-router';
import UserCard from '../components/UserCard'

class AllUsersContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      allUsers: []
    }
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
    let users = this.state.allUsers.map((user) => {
      return (
        <UserCard
          key = {user.id}
          id = {user.id}
          image = {user.image}
          name = {user.name}
          city = {user.city}
          state = {user.state}
        />
      )
    })
    return(
      <div className="row">
      {users}
      </div>

    )
  }
}

export default AllUsersContainer
