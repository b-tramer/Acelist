import React, { Component } from 'react';
import { Link } from 'react-router';
import AllMedia from '../components/AllMedia';

class ProfileContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: {},
      lists: [],
      media: [],
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        console.log("array of arrays")
        console.log(responseData)
        this.setState({
          user: responseData.user,
          lists: responseData.lists,
          media: responseData.media
        })
    });
  }

  render() {
    let user_media = this.state.lists.map((list) => {
      return(
        <p> {list.name} </p>
      )

    })

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
