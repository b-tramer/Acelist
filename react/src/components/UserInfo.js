import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class UserInfo extends Component {

  render() {
    // if the user is signed in, show their facebook photo, otherwise show default graphic
    let userNotSignedIn;
    let userSignedIn;
    let profilePicture;
    if (this.props.user.image) {
      userNotSignedIn = 'hidden'
      userSignedIn = 'show'
      profilePicture = this.props.user.image + "/picture?type=large"
    } else if (this.props.user.name){
      profilePicture = this.props.user.image
      userNotSignedIn = 'hidden'
      userSignedIn = 'show'
    } else {
      userNotSignedIn = 'show'
      userSignedIn = 'hidden'
      profilePicture = 'http://gurucul.com/wp-content/uploads/2015/01/default-user-icon-profile.png'
    }
    return(
      <div>
        <div className="profile-container" id="top">
          <div className="row">
            <div className="large-1 columns" id="profile-picture">
           <img src={profilePicture}/>
            </div>
            <div id={userSignedIn}>
              <div className="large-8 large-offset-3 columns" id="user-name">
                <h3> {this.props.user.name} </h3>
              </div>
            </div>
            <div id={userNotSignedIn}>
              <div className="large-8 large-offset-3 columns" id="user-name">
                <h3> Not Signed In? </h3>
                <a href="/login"> <p id="sign-in-up"> Login or Signup → </p> </a>
              </div>
            </div>
          </div>
          <p id='see-all-users'> <Link to='/users'> Search Users <img src={assetHelper["search.svg"]} height="25" width="25"/></Link> </p>

          <a href="#top" id="go-to-top">
          <img src={assetHelper["to-top-button2.svg"]} width="40"/>
          </a>
        </div>
      </div>

    )
  }
}

export default UserInfo;
