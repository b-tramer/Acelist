import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MediaCard extends Component {

  render() {
    let poster = 'https://image.tmdb.org/t/p/w500' + this.props.poster_path
    // let name;
    // let release;
    // if (this.props.media_type === 'movie') {
    //   name = this.props.title
    //   release = this.props.release_date
    // } else {
    //   name = this.props.tvTitle
    //   release = this.props.tvAirDate
    // };

    return(

      <div className="column row">

          <div className="row" id="movie-row">
            <div className="small-12 large-2 columns">
              <img src={poster} height="150" width="150"/>
            </div>

            <div className="small-12 large-10 columns" id="movie-info">
              <h1> {this.props.title} </h1>
              <h5> Release Date: {this.props.release_date} </h5>
              <p> {this.props.overview} </p>
            </div>
          </div>

      </div>


    )
  }
}

export default MediaCard;
