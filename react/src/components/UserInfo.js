import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class UserInfo extends Component {

  render() {

    return(
      <div className="profile-container">

        <div className="row">
          <div className="large-1 columns" id="profile-picture">
          <img src="  https://avatars0.githubusercontent.com/u/23392808?v=3&u=95f0fe11c5749aaa695ba9a757d48beaaca6ce2a&s=400"/>

          </div>

          <div className="large-8 large-offset-3 columns" id="user-name">
          <h3> {this.props.user.name} </h3>
          </div>
        </div>

      </div>
    )
  }
}

export default UserInfo;
