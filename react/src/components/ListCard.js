import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ListCard extends Component {

  render() {
    let id = this.props.id
    let name = this.props.name
    return(
      <div>
        <h4> <button type="button" id='list-button' onClick={() => this.props.handleClick(id, name)}>{this.props.name}</button> </h4>
      </div>
    )
  }
}

export default ListCard;
