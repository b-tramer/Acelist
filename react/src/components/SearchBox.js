import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={this.props.showSearchBarClass}>
        <div>
          <div className="search">
            <form className="searchbox">
              <label id="search-label" className={this.props.showCreateClass}>
                <input onChange={this.props.handleListNameChange} type="text" placeholder="Name Your List..." id="media-input-box" value={this.props.listNameValue} />
                <input type="submit" value="Create" id="media-search-button" onClick={this.props.listNameSubmit}/>
              </label>

              <label className={this.props.showSearch} id="search-label">
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
