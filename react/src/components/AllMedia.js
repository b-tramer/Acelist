import React from 'react'
import MediaCard from '../components/MediaCard'

class AllMedia extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    let newMedia = this.props.media.map((media) => {
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
        {newMedia}
      </div>
    )
  }

}

export default AllMedia
