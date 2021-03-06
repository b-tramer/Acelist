import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RecTile from '../components/RecTile';
import { Link } from 'react-router';

class MediaCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      recMedia: [],
      recMediaID: 'hidden',
      current_primary_id: this.props.id
    }
    this.onRecClick = this.onRecClick.bind(this)
    this.onIdClick = this.onIdClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data_id === 'undefined') {
      fetch(`/api/v1/media?data_id=${nextProps.id}`, { credentials: 'same-origin' })
        .then(response => response.json())
        .then(responseData => { this.setState({ current_primary_id: responseData.current_primary_id }) });
    } else {
      this.setState({ current_primary_id: nextProps.id })
    }
  }

  fetchRecsAPI(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ recMedia: data.results }))
  }

  // immediately after being added medias media_id (which is needed to fetch API), will be called simply id - until there is a page refresh or navigation. In this case, it must search based on its 'id' --- id = this.props.id | data_id = this.props.data_id
  // if data_id is undefined, fetch the api using id
  onRecClick(id, media_type, data_id) {
    if (this.state.recMediaID === 'hidden' && typeof data_id === 'undefined') {
      let url_two = `https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=1`
      this.fetchRecsAPI(url_two)
      this.setState({ recMediaID: 'rec-popup', current_id: id, current_media_type: media_type, current_data_id: data_id })
    } else if (this.state.recMediaID === 'hidden' && typeof data_id !== 'undefined') {
      let url = `https://api.themoviedb.org/3/${media_type}/${data_id}/recommendations?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=1`
      this.fetchRecsAPI(url)
      this.setState({ recMediaID: 'rec-popup', current_id: id, current_media_type: media_type, current_data_id: data_id })
    } else {
      this.setState({ recMediaID: 'hidden', recMedia: [] })
    }
  }

  // div where onClick sets the state of current_primary_id to whatever is clicked, and then that is interpolated into Link
  onIdClick(id, data_id) {
    if (typeof data_id === 'undefined') {
      fetch(`/api/v1/media?data_id=${id}`, { credentials: 'same-origin' })
        .then(response => response.json())
        .then(responseData => {
          this.setState({ current_primary_id: responseData.current_primary_id })
      });
    } else {
      this.setState({ current_primary_id: id })
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
          tv_title = {media.original_name}
          media_type = {this.props.media_type}
          handleClickSubmit = {this.props.handleClickSubmit}
          mediaDeleteClass = {this.props.mediaDeleteClass}
        />
      )
    })

    let poster = 'https://image.tmdb.org/t/p/w500' + this.props.poster_path
    let id = this.props.id
    let data_id = this.props.data_id
    let media_type = this.props.media_type
    let media_id = this.props.id
    let name;
    let release;
    if (this.props.title) {
      name = this.props.title
      release = this.props.release_date
    } else {
      name = this.props.original_name
      release = this.props.first_air_date
    };

    let prim_id = this.state.current_primary_id
    return(
      <div>
      <div className={this.props.mediaDeleteClass}>
        <button id='delete-media-button' type="button" onClick={() => this.props.handleDeleteMedia(id)}>
          DELETE
          <img src={assetHelper["delete-media-x.svg"]} height="20" width="20"/>
        </button>
      </div>

      <button type='button' id='delete-media-button' onClick={() => this.onRecClick(id, media_type, data_id)}>
        RECOMMENDATIONS
      <img src={assetHelper["info-button.svg"]} height="20" width="20"/>
      </button>

        <Link to={`/media/${prim_id}`}>
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
        </Link>

        <div id={this.state.recMediaID} className="rec-popup">
          <div> <center> <h5 id='follow-popup-title'> You Might Also Like... </h5> </center> <img src={assetHelper["delete-media-x-rec.svg"]} height="20" width="20" id='popup-x' onClick={this.onRecClick} id="rec-x"/>
        </div>
          {recMedia}
        </div>
      </div>
    )
  }
}

export default MediaCard;
