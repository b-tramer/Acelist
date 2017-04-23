import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends Component {
  render() {
    return (
      <div className="column row">
        <form className="searchbox">
          <label id="search-label">
            <input name="title" onChange={this.props.handlerFunction} type="text" placeholder="Search Movie Title..." id="movie-input-box" value={this.props.value} />
            <input onClick={this.props.handleSubmit} type="submit" value="Search" id="movie-search-button"/>
          </label>
          </form>
      </div>
    )
  }
}

export default SearchBox
