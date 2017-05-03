import React, { Component } from 'react';
import ListCard from '../components/ListCard'

class AllLists extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    let newList = this.props.lists.map((list) => {
      if (this.props.selectedId === list.id) {
        return (
          <ListCard
            key = {list.id}
            id = {list.id}
            name = {list.name}
            handleClick = {this.props.handleClick}
            selectedBackgroundId = 'list-button-active'
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
          />
        )
      }
    })
    return(
      <div>
        {newList}
        <div>
          <h4> <button type="button" id='create-button' onClick={this.props.handleCreate}>+ Create A New List</button> </h4>
        </div>
      </div>
    )
  }
}

export default AllLists
