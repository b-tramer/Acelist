import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecTile from '../components/RecTile';

class MediaCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      recMedia: [],
      recMediaID: 'hidden'
    }
    this.onRecClick = this.onRecClick.bind(this)
  }

  fetchRecsAPI(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ recMedia: data.results }))
  }

  onRecClick(id) {
    if (this.state.recMediaID === 'hidden') {
      let url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=1`
      this.fetchRecsAPI(url)
      this.setState({ recMediaID: 'rec-popup' })
    } else {
      this.setState({ recMediaID: 'hidden' })
    }
  }

  render() {
    let recMedia = this.state.recMedia.map((media) => {
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

    let poster = 'https://image.tmdb.org/t/p/w500' + this.props.poster_path
    let id = this.props.id
    let data_id = this.props.data_id
    let name;
    let release;
    if (this.props.title) {
      name = this.props.title
      release = this.props.release_date
    } else {
      name = this.props.original_name
      release = this.props.first_air_date
    };
    return(
      <div>
      <div className={this.props.mediaDeleteClass}>
      <button type='button' id='delete-media-button' onClick={() => this.onRecClick(data_id)}><img src={assetHelper["info-button.svg"]} height="20" width="20"/></button>
        <button id='delete-media-button' type="button" onClick={() => this.props.handleDeleteMedia(id)}>

        <img src={assetHelper["delete-media-x.svg"]} height="20" width="20"/></button> </div>
        <div className="row" id="movie-row">
          <div className="small-12 large-3 columns">
            <img src={poster} height="150" width="150"/>
          </div>
          <div className="small-12 large-9 columns" id="movie-info">
            <h2> {name} </h2>
            <h5> Release Date: {release} </h5>
            <p> {this.props.overview} </p>
          </div>
        </div>

        <div id={this.state.recMediaID} className="rec-popup">
          <center> <h4> RECOMMENDATIONS </h4> </center>
            {recMedia}
        </div>

      </div>
    )
  }
}

export default MediaCard;
