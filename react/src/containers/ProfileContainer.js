import React, { Component } from 'react';
import { Link } from 'react-router';

class ProfileContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: {},
      lists: []
    }
  }

  componentDidMount() {
    this.getUserData();
    this.getMediaData();
  }

  getUserData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ user: responseData.user, lists: responseData.lists })
    });
  }

  getMediaData() {
    fetch(`/api/v1/media`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ media: responseData })
    });
  }

  render() {
    list_name_count = 0
    let user_media = this.state.lists.map((list) => {
      return(
        <p> {list.name} </p>
      )
      list_name_count += 1
    })

    return(
      <div>
        <center>

          <h3> {this.state.user.name} </h3>
          {user_media}

        </center>
      </div>

    )
  }
}

export default ProfileContainer
