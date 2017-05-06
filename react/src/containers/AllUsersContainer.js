import React, { Component } from 'react'
import { Link } from 'react-router'
import UserCard from '../components/UserCard'
import UserSearch from '../components/UserSearch'
import AllUsers from '../components/AllUsers'

class AllUsersContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      allUsers: [],
      query: '',
      filtered_data: []
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
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

  getSearchResults() {
    let query = this.state.query
    fetch("/api/v1/users", {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ allUsers: responseData.user })
    });
  }

  handleSearchChange(event){
    this.setState({ query: event.target.value })
    this.getSearchResults();
  }

  render() {
    return(
      <div className="row">
        <UserSearch query = {this.state.query} onChange = {this.handleSearchChange} />
        <AllUsers users = {this.state.allUsers}/>
      </div>

    )
  }
}

export default AllUsersContainer
