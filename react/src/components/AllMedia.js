import React from 'react'
import MediaCard from '../components/MediaCard'
import SearchBox from '../components/SearchBox'

class AllMedia extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
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
        />
      )
    })

    return(
      <div className="about">
        <SearchBox
          mediaValue = {this.props.mediaValue}
          handleTitleChange = {this.props.handleTitleChange}
          handleTitleSubmit = {this.props.handleTitleSubmit}

          listNameValue = {this.props.listNameValue}
          handleListNameChange = {this.props.handleListNameChange}
          handleListSubmit = {this.props.handleListSubmit}
          listName = {this.props.listName}
        />
        {media}
      </div>
    )
  }

}

export default AllMedia
