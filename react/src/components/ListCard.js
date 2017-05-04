import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ListCard extends Component {

  render() {
    let id = this.props.id
    let name = this.props.name
    return(
      <div>
        <div className="list-card">
          <h4> <button type="button" id={this.props.selectedBackgroundId} onClick={() => this.props.handleClick(id, name)}>{this.props.name}</button> </h4>
          <p> <button id='delete-p-tag' className={this.props.listDeleteButtonClass} type="button" onClick={() => this.props.handleDeleteList(id)}><img src={assetHelper["delete-media-x.svg"]} height="15" width="15"/></button> </p>
        </div>
      </div>
    )
  }
}

export default ListCard;
