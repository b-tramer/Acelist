import React, { Component } from 'react';
import { Link } from 'react-router';
import AllMedia from '../components/AllMedia';

class ProfileContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: {},
      lists: [],
      media: []
    }
    this.formatListJson = this.formatListJson.bind(this)
  }

  componentDidMount() {
    this.getUserData();
    this.getMediaData();
  }

  getUserData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          user: responseData.user,
          lists: responseData.lists,
          media: responseData.media
        })
    });
  }

  formatListJson() {
    this.setState({ media: this.state.media })
  }

  getMediaData() {
    fetch(`/api/v1/media`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ media: responseData })
    });
  }

  render() {

    return(
      <div>
        <center>

          <h2> {this.state.user.name} </h2>
          {user_media}
        </center>

        <AllMedia
          media = {this.state.media}
        />

      </div>

    )
  }
}

export default ProfileContainer
