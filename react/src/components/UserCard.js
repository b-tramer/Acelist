import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class UserCard extends Component {

  render() {
    let profilePicture = this.props.image + "/picture?type=large"
    return(
        <div className="small-12 large-3 columns" id="profile-picture-all-users">
          <Link to={`/users/${this.props.id}`}>
            <img src={profilePicture} height="150" width="150"/>
            <h4> {this.props.name} </h4>
            <p> {this.props.city} {this.props.state} </p>
          </Link>
        </div>
    )
  }
}

export default UserCard;
