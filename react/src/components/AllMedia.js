import React from 'react'
import MediaCard from '../components/MediaCard'
import SearchBox from '../components/SearchBox'

class AllMedia extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    let searchBoxClass;
    if (this.props.showSearchBarClass === 'hidden') {
      searchBoxClass = 'searchbox-hidden'
    } else {
      searchBoxClass = 'searchbox'
    }

    let media = this.props.media.map((media) => {
      return (
        <MediaCard
          key = {media.id}
          id = {media.id}
          title = {media.title}
          overview = {media.overview}
          poster_path = {media.poster_path}
          release_date = {media.release_date}
          media_type = {media.media_type}
          original_name = {media.original_name}
          first_air_date = {media.first_air_date}
          handleDeleteMedia = {this.props.handleDeleteMedia}
          mediaDeleteClass = {this.props.mediaDeleteClass}
        />
      )
    })

    return(
      <div className="about">
        <div id="search-box-all">
          <SearchBox
            mediaValue = {this.props.mediaValue}
            handleTitleChange = {this.props.handleTitleChange}
            handleTitleSubmit = {this.props.handleTitleSubmit}

            listNameValue = {this.props.listNameValue}
            handleListNameChange = {this.props.handleListNameChange}
            listName = {this.props.listName}
            showCreateClass = {this.props.showCreateClass}
            listNameSubmit = {this.props.listNameSubmit}

            showSearchBarClass = {this.props.showSearchBarClass}
          />
        </div>
        <div className={searchBoxClass}>
          {media}
        </div>
      </div>
    )
  }

}

export default AllMedia
