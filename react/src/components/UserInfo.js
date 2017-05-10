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
    this.handleFollowChange = this.handleFollowChange.bind(this)
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

  componentWillReceiveProps(nextProps) {
    this.setState({ follow_boolean: nextProps.follow_boolean })
  }

  handleFollowChange(userId) {
    if (this.state.follow_boolean === false) {
      this.setState({ follow_boolean: true })
      this.props.followOnClick(userId)
    } else {
      this.setState({ follow_boolean: false })
      this.props.unfollowOnClick(userId)
    }
  }

  render() {
    let userId = this.props.user.id

    let showFollow;
    let nameId;
    if (this.props.current_user.id == this.props.user.id) {
      showFollow = 'hidden'
      nameId = 'name-button-hidden'
    } else {
      showFollow = 'follow-button-class'
      nameId = 'name-button'
    }

    let follow;
    if (this.state.follow_boolean === false) {
      follow = <button type='button' className={showFollow} id='follow-button' onClick={() => this.handleFollowChange(userId)}> ＋FOLLOW </button>
    } else {
      follow = <button type='button' className={showFollow} id='follow-button' onClick={() => this.handleFollowChange(userId)}> <img src={assetHelper["following.svg"]} id="following-check" width="16px"/> FOLLOWING </button>
    }

    // if the user is signed in, show their facebook photo, otherwise show default graphic
    let userNotSignedIn;
    let userSignedIn;
    let profilePicture;
    let nameDisplay;
    if (this.props.user.image) {
      userNotSignedIn = 'hidden'
      userSignedIn = 'show'
      profilePicture = this.props.user.image + "/picture?type=large"
      nameDisplay = <h3 id='see-all-users'>
        <button type="button" id={nameId}> {this.props.user.name} </button>
        {follow}
        <button type="button" id='followers-button' onClick={this.clickViewFollowers}> FOLLOWERS </button>
        <button type="button" id='followers-button' onClick={this.clickViewFollowing}> FOLLOWING </button>
        <Link to='/users' id='search-icon'> Search Users <img src={assetHelper["search.svg"]}  height="30" width="30"/></Link>
      </h3>
    } else {
      userNotSignedIn = 'show'
      userSignedIn = 'hidden'
      profilePicture = 'http://gurucul.com/wp-content/uploads/2015/01/default-user-icon-profile.png'
      nameDisplay = <h3 id='see-all-users'>
        <button type="button" id='follow-button-not-signed'> <a href="/login"> Not Signed In? → Login/Signup </a> </button>
        <Link to='/users'> Search Users <img src={assetHelper["search.svg"]} height="30" width="30"/></Link>
      </h3>
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
              </div>
            </div>
            <div id={userNotSignedIn}>
              <div className="large-8 large-offset-3 columns" id="user-name">
              </div>
            </div>
          </div>

          {nameDisplay}

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
