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
    this.onRecClickNewPage = this.onRecClickNewPage.bind(this)
  }

  fetchRecsAPI(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ recMedia: data.results }))
  }

  fetchRecsAPIMore(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ recMedia: data.results }))
    console.log(url)
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

  onRecClickNewPage() {
    if (typeof this.state.current_data_id === 'undefined') {
      let url_two = `https://api.themoviedb.org/3/${this.state.current_media_type}/${this.state.current_id}/recommendations?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=2`
      this.fetchRecsAPIMore(url_two)
      this.setState({ recMediaID: 'rec-popup' })
    } else if (typeof this.state.current_data_id !== 'undefined') {
      let url = `https://api.themoviedb.org/3/${this.state.current_media_type}/${this.state.current_data_id}/recommendations?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=2`
      this.fetchRecsAPIMore(url)
      this.setState({ recMediaID: 'rec-popup' })
    } else {
      this.setState({ recMediaID: 'hidden', recMedia: [] })
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
          <div> <center> <h5 id='follow-popup-title'> You Might Also Like... </h5> </center> <img src={assetHelper["delete-media-x-rec.svg"]} height="20" width="20" id='popup-x' onClick={this.onRecClick} id="rec-x"/>
        </div>
          {recMedia}
          <button type="button" onClick={this.onRecClickNewPage}> LOAD MORE TITLES </button>
        </div>

      </div>
    )
  }
}

export default MediaCard;
