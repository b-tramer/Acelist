import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends Component {
  render() {
    return (
      <div>


        <div >
          <div className="search">
            <form className="searchbox">
              <label id="search-label" className={this.props.showCreateClass}>
                <input onChange={this.props.handleListNameChange} type="text" placeholder="Name Your List..." id="media-input-box" value={this.props.listNameValue} />
                <input type="submit" value="Create" id="media-search-button" onClick={this.props.listNameSubmit}/>
              </label>

              <label id="search-label">
                <input onChange={this.props.handleTitleChange} type="text" placeholder="Search Movies & Shows..." id="media-input-box" value={this.props.mediaValue} />
                <input onClick={this.props.handleTitleSubmit} type="submit" value="Add" id="media-search-button"/>
              </label>
            </form>
          </div>
        </div>

      </div>
    )
  }
}

export default SearchBox
