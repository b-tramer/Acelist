import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import FollowUserTile from '../components/FollowUserTile';

class UserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      showFollow: 'hidden'
    }
    this.clickViewFollowing = this.clickViewFollowing.bind(this)
    this.clickViewFollowers = this.clickViewFollowers.bind(this)
  }

  // bound to 'following' button in return of this container
  clickViewFollowing() {
    if (this.state.showFollow === 'hidden') {
      this.setState({ showFollow: 'show-popup', users: [] })
      this.getCurrentUserFollowingData()
    } else {
      this.setState({ showFollow: 'hidden', users: [] })
    }
  }

  // returns users following data from followers api controller - show
  getCurrentUserFollowingData() {
    let id = this.props.user.id
    fetch(`/api/v1/followers/${id}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData)
        this.setState({ users: responseData.following  })
    });
  }

  // bound to 'followers' button in return of this container
  clickViewFollowers() {
    if (this.state.showFollow === 'hidden') {
      this.setState({ showFollow: 'show-popup', users: [] })
      this.getCurrentUserFollowersData()
    } else {
      this.setState({ showFollow: 'hidden', users: [] })
    }  }

  // returns users followers data from followers api controller - show
  getCurrentUserFollowersData() {
    let id = this.props.user.id
    fetch(`/api/v1/followers/${id}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData)
        this.setState({ users: responseData.followers  })
    });
  }

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
    let userId = this.props.user.id
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

          <p id='see-all-users'>
            <button type="button" id='follow-button' onClick={this.clickViewFollowing}> FOLLOWING </button>
            <button type="button" id='follow-button' onClick={this.clickViewFollowers}> FOLLOWERS </button>
            <button type="button" id='follow-button' onClick={() => this.props.followOnClick(userId)}> FOLLOW </button>
            <Link to='/users'> Search Users <img src={assetHelper["search.svg"]} height="30" width="30"/></Link>
          </p>

          <a href="#top" id="go-to-top">
          <img src={assetHelper["to-top-button2.svg"]} width="40"/>
          </a>
        </div>

        <div className="row">
          <FollowUserTile users = {this.state.users} showFollow = {this.state.showFollow} />
        </div>
      </div>

    )
  }
}

export default UserInfo;
