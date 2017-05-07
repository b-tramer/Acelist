import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class UserCard extends Component {

  render() {
    let profilePicture;
    if (this.props.image.includes("graph")) {
      profilePicture = this.props.image + "/picture?type=large"
    } else {
      profilePicture = this.props.image
    }
    return(
      <div className="small-12 medium-4 large-4 columns" id="profile-picture-all-users">
        <Link to={`/users/${this.props.id}`}>
          <img src={profilePicture} height="150" width="150"/>
          <h4> {this.props.name} </h4>
        </Link>
      </div>
    )
  }
}

export default UserCard;
