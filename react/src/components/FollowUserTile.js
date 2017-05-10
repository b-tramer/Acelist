import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class FollowUserTile extends Component {

  render() {

    let users = this.props.users.map((user) => {
      let profilePicture = user.image + "/picture?type=large"
      return (
        <a href={`/users/${user.id}`}>
        {popupTitle}
          <h5 className="follower-info"> <img src={profilePicture} height="50" width="50"/> {user.name} </h5>
        </a>
      )
    })

    let popupTitle;
    if (this.props.selectedFollowType === 'following') {
      popupTitle =
      <div onClick={this.props.closeFollowing}>
      <h5 id='follow-popup-title'>
        {this.props.user_name} Is Following...
      </h5>
      <img src={assetHelper["delete-media-x.svg"]} height="20" width="20" id='popup-x'/>
      </div>
    } else {
      popupTitle =
      <div onClick={this.props.closeFollowers}>
        <h5 id='follow-popup-title'>
          {this.props.user_name} Is Followed By...
        </h5>
        <img src={assetHelper["delete-media-x.svg"]} height="20" width="20" id='popup-x'/>
      </div>
    }
    return(
      <div className="small-6 small-centered large-6 large-centered columns" id={this.props.showFollow}>
        <center> {popupTitle} </center>
        {users}
      </div>
    )
  }
}

export default FollowUserTile
