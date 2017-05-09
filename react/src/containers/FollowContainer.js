import React, { Component } from 'react'
import { Link } from 'react-router'
import UserInfo from '../components/UserInfo'

class FollowContainer extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.followOnClick = this.followOnClick.bind(this)
  }

  // componentDidMount() {
  //   this.getUserData()
  // }

  // // get current users id so that when a user follows someone, it will provide the correct associations
  // getUserData() {
  //   fetch(`/api/v1/users`, { credentials: 'same-origin' })
  //     .then(response => response.json())
  //     .then(responseData => {
  //       this.setState({ currentUserId: responseData.current_user.id })
  //   });
  // }

  // send the current users ID and the ID of the person they are following
  followOnClick(personID) {
    let followPayload = {
      following_id: personID
    }
    this.sendFollow(followPayload)
  }

  sendFollow(followPayload) {
    fetch("/api/v1/followers", {
      method: "POST",
      credentials: 'same-origin',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(followPayload)
    })
    .then(this.handleListSubmit())
  }

  render() {
    return(
      <div>
        <UserInfo user = {this.props.user} followOnClick = {this.followOnClick} />
      </div>
    )
  }
}

export default FollowContainer
