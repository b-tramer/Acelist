import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends Component {
  render() {
    return (
      <div className="column row">

        <form className="searchbox">

          <label id="search-label">
            <input onChange={this.props.handleListNameChange} type="text" placeholder="Name Your List..." id="media-input-box" value={this.props.listNameValue} />
            <input type="submit" value="Create" id="media-search-button"/>
          </label>

          <label id="search-label">
            <input onChange={this.props.handleTitleChange} type="text" placeholder="Search Movies & Shows..." id="media-input-box" value={this.props.mediaValue} />
            <input onClick={this.props.handleTitleSubmit} type="submit" value="Search" id="media-search-button"/>
          </label>

          <label id="search-label">
            <input onClick={this.props.handleListNameSubmit} type="submit" value="Save" id="media-save-button"/>
          </label>

        </form>

      </div>
    )
  }
}

export default SearchBox
