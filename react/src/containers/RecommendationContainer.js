import React, { Component } from 'react';
import { Link } from 'react-router';

class RecommendationContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      recMedia = []
    }
  }

  fetchRecsAPI(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ recMedia: data.results }))
  }

  onRecClick(id) {
    let url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=1`
    this.fetchRecsAPI(url)
  }

  render() {
    let media = this.state.recMedia.map((media) => {
      return (
        <RecTile
          key = {media.id}
          id = {media.id}
          title = {media.title}
          poster_path = {media.poster_path}
          media_type = {media.media_type}
        />
      )
    })

    return(
      <div>
      </div>
    )
  }
}

export default RecommendationContainer
