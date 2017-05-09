import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class FollowUserTile extends Component {

  render() {
    let users = this.props.users.map((user) => {
      let profilePicture = user.image + "/picture?type=large"
      return (
        <Link to={`/users/${user.id}`}>
          <h4> <img src={profilePicture} height="50" width="50"/> {user.name} </h4>
        </Link>
      )
    })
    return(
      <div>
        {users}
      </div>
    )
  }
}

export default FollowUserTile
