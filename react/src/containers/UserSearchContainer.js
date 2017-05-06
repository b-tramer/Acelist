import React, { Component } from 'react'
import { Link } from 'react-router'
import UserCard from '../components/UserCard'
import UserSearch from '../components/UserSearch'
import AllUsers from '../components/AllUsers'

class UserSearchContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      query: '',
      filtered_data: []
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  getSearchResults() {
    let query = this.state.query
    fetch(`/api/v1/users`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ filtered_data: responseData })
    });
  }

  handleSearchChange(event){
    this.setState({ query: event.target.value })
    this.getSearchResults();
  }

  render() {
    return(
      <div className="row">
        <UserSearch
          query = {this.state.query}
          onChange = {this.handleSearchChange}
        />

        <AllUsers
          users = {this.state.filtered_data}
        />
      </div>

    )
  }
}

export default UserSearchContainer
