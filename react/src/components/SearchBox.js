import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
      let placeholder = `Search & Add Media To ${this.props.listNameValue}...`
    return (
      <div className={this.props.showSearchBarClass}>
        <div>
          <div className="search">
            <div className="searchbox">
              <form >
                <label id="search-label" className={this.props.showCreateClass}>
                  <input onChange={this.props.handleListNameChange} type="text" placeholder="Name Your List... (Ex: 'TV Comedies', 'Crime Movies')" id="media-input-box" value={this.props.listNameValue}/>
                  <input type="submit" value="Create" id="media-search-button" onClick={this.props.listNameSubmit}/>
                </label>
              </form>
              <form >
                <label className={this.props.showSearch} id="search-label" >
                  <input onChange={this.props.handleTitleChange} type="text" placeholder={placeholder} id="media-input-box" value={this.props.mediaValue} />
                  <input onClick={this.props.handleTitleSubmit} value="＋" type="submit" id="media-search-button"/>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBox
