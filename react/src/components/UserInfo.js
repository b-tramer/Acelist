import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class UserInfo extends Component {

  render() {
    // if the user is signed in, show their facebook photo, otherwise show default graphic
    let profilePicture;
    if (this.props.user.image) {
      profilePicture = this.props.user.image + "/picture?type=large"
    } else {
      profilePicture = 'http://gurucul.com/wp-content/uploads/2015/01/default-user-icon-profile.png'
    }
    return(
      <div className="profile-container">

        <div className="row">
          <div className="large-1 columns" id="profile-picture">
          <img src={profilePicture}/>
          </div>

          <div className="large-8 large-offset-3 columns" id="user-name">
          <h3> {this.props.user.name} </h3>
          <p> {this.props.user.city} {this.props.user.state} </p>
          </div>
        </div>

      </div>
    )
  }
}

export default UserInfo;
