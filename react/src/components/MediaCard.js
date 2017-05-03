import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MediaCard extends Component {

  render() {

    let poster = 'https://image.tmdb.org/t/p/w500' + this.props.poster_path
    let id = this.props.id
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
      <span> <button id='delete-media-button' type="button" onClick={() => this.props.handleDeleteMedia(id)}><img src="./delete-media-button-grey2.svg" height="20" width="20"/></button> </span>
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
      </div>


    )
  }
}

export default MediaCard;
