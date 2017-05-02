import React, { Component } from 'react';
import { Link } from 'react-router';
import AllMedia from '../components/AllMedia';
import AllLists from '../components/AllLists';
import ListCard from '../components/ListCard';

class ProfileContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: {},
      lists: [],
      media: [],
      selectedId: 0,
      newMedia: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.checkIfHasListId = this.checkIfHasListId.bind(this)
  }

  componentDidMount() {
    this.getUserData();
  }

  // fetch data from users api controller - index
  getUserData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          user: responseData.user,
          lists: responseData.lists,
          media: responseData.media
        })
    });
  }

  // when a list name is clicked, it sets the state of 'selectedId' to the list's id
  handleClick(id) {
    if (id != this.state.selectedId ) {
      this.setState({ selectedId: id })
    } else {
      this.setState({ selectedId: 0 })
    }
    this.checkIfHasListId()
  }

  // once clicked, filter out all matching media and put into new array
  checkIfHasListId() {
    let media = this.state.media
    let id = this.state.selectedId
    let newMediaArray = media.filter((item) => {
      return item.list_id === id
    })
    this.setState({ newMedia: newMediaArray })
  }

  render() {
    return(
      <div className="column row" id="profile-main-div">
        <h3> {this.state.user.name}’s Lists </h3>
        <AllLists lists = {this.state.lists} handleClick = {this.handleClick} />
        <AllMedia media = {this.state.newMedia} />
      </div>
    )
  }
}

export default ProfileContainer
