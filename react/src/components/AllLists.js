import React, { Component } from 'react';
import ListCard from '../components/ListCard'

class AllLists extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getUserData()
  }

  // get current users id so that if a list is made by someone else, the current user cannot delete their list
  getUserData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ userId: responseData.current_user.id  })
    });
  }

  render() {
    let searchBoxClass;
    if (this.props.showSearchBarClass === 'hidden') {
      searchBoxClass = 'create-hidden'
    } else {
      searchBoxClass = 'show'
    }

    let newList = this.props.lists.map((list) => {
      if (this.props.selectedId === list.id && this.state.userId === list.user_id) {
        return (
          <ListCard
            key = {list.id}
            id = {list.id}
            name = {list.name}
            handleClick = {this.props.handleClick}
            selectedBackgroundId = 'list-button-active'
            listDeleteButtonClass = 'show'
            handleDeleteList = {this.props.handleDeleteList}
          />
        )
      } else {
        return (
          <ListCard
            key = {list.id}
            id = {list.id}
            name = {list.name}
            handleClick = {this.props.handleClick}
            selectedBackgroundId = 'list-button'
            listDeleteButtonClass = 'hidden'
          />
        )
      }
    })
    return(
      <div>
        {newList}
        <div>
          <h4> <button className={searchBoxClass} type="button" id='create-button' onClick={this.props.handleCreate}>+ Create A New List</button> </h4>
        </div>
      </div>
    )
  }
}

export default AllLists
