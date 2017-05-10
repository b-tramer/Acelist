import React, { Component } from 'react'
import { Link } from 'react-router'
import UserInfo from '../components/UserInfo'

class FollowContainer extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.followOnClick = this.followOnClick.bind(this)
    this.unfollowOnClick = this.unfollowOnClick.bind(this)
  }

  // send the current users ID and the ID of the person they are following
  followOnClick(personID) {
    let followPayload = {
      following_id: personID
    }
    this.sendFollow(followPayload)
  }

  // called from above function, sends followPayload to lists api controller - create
  sendFollow(followPayload) {
    fetch("/api/v1/followers", {
      method: "POST",
      credentials: 'same-origin',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(followPayload)
    })
  }

  // called from above function, sends unfollowPayload to lists api controller - destroy
  unfollowOnClick(personID) {
    fetch(`/api/v1/followers/${personID}`, {
      method: "DELETE",
      credentials: 'same-origin',
      headers: { "Content-Type": "application/json" }
    })
  }

  render() {
    return(
      <div>
        <UserInfo
          user = {this.props.user}
          followOnClick = {this.followOnClick}
          unfollowOnClick = {this.unfollowOnClick}
          current_user = {this.props.current}
          follow_boolean = {this.props.follow_boolean}
        />
      </div>
    )
  }
}

export default FollowContainer
