import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class FollowUserTile extends Component {

  render() {
    let users = this.props.users.map((user) => {
      let profilePicture = user.image + "/picture?type=large"
      return (
        <a href={`/users/${user.id}`}>
          <h4 className="follower-info"> <img src={profilePicture} height="50" width="50"/> {user.name} </h4>
        </a>
      )
    })
    return(
      <div className="small-6 small-centered large-6 large-centered columns" id={this.props.showFollow}>
        {users}
      </div>
    )
  }
}

export default FollowUserTile
