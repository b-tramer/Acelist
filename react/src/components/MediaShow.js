import React, { Component } from 'react';
import { Link } from 'react-router';
import BackButton from '../components/BackButton';

class MediaShow extends Component {
  constructor(props){
    super(props);
    this.state = {
      media_type: '',
      media_data_id: 0,
      genres: [],
      production_companies: [],
      seasons: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ media_type: nextProps.media_type })
    let url = `https://api.themoviedb.org/3/${nextProps.media_type}/${nextProps.media_data_id}?&api_key=4ce5312dd9fd3f292ee4e7597f92342c`
    this.fetchAPI(url)
  }

  fetchAPI(url) {
    fetch(url)
    .then(response => response.json())
    .then(data =>
      this.setState({
        title: data.title,
        tagline: data.tagline,
        overview: data.overview,
        genres: data.genres,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        budget: data.budget,
        revenue: data.revenue,
        homepage: data.homepage,
        popularity: data.vote_average,
        production_companies: data.production_companies,
        release_date: data.release_date,
        runtime: data.runtime,
        seasons: data.seasons,
        original_name: data.original_name,
        num_of_episodes: data.number_of_episodes,
        num_of_seasons: data.number_of_seasons,
        first_air_date: data.first_air_date,
        episode_runtime: data.episode_run_time
    }))
  }

  render() {
    // let genre_one = this.state.genres[0].name
    // let genre_two = this.state.genres[1].name

    let poster = 'https://image.tmdb.org/t/p/w500' + this.state.poster_path
    let backdrop = 'https://image.tmdb.org/t/p/w500' + this.state.backdrop_path
    let revenue;
    if (this.state.revenue) {
      revenue = this.state.revenue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
    let vote;
    if (this.state.popularity) {
      vote = this.state.popularity.toFixed(1) + '/10'
    }

    let title;
    let release_date;
    let runtime;
    let box_season;
    if (this.state.media_type === 'movie') {
      title = this.state.title
      release_date = this.state.release_date
      runtime = this.state.runtime
      box_season = <h5> <strong>Box Office:</strong> <span id='show-data'> ${revenue} </span> </h5>
    } else {
      title = this.state.original_name
      release_date = this.state.first_air_date
      runtime = this.state.episode_runtime
      box_season = <h5> <strong>Number Of Seasons:</strong> <span id='show-data'> {this.state.num_of_seasons} </span> </h5>
    }

    if (this.state.media_type === 'tv' && this.state.episode_runtime.length > 1) {
      runtime = this.state.episode_runtime[0]
    } else if (this.state.media_type === 'tv') {
      runtime = this.state.episode_runtime
    }

    return(
      <div id='top-media-show-info'>
      <BackButton />
        <div className='row'>
          <div className='large-4 columns'>
            <img src={poster}/>
          </div>

          <div className='large-8 large-offset-2 columns' id='main-info-card'>
            <div id='show-header'>
              <center> <h1> <strong> {title} </strong> </h1>
              <h5> <em>{this.state.tagline}</em> </h5> </center>
            </div>
            <center> <p> {this.state.overview} </p> </center>

          <center>
          <div className='row' id='show-data-info'>
            <div className='large-6 large-offset-2 columns data-info'>
              <h5> <strong>Original Release:</strong> <span id='show-data'> {release_date} </span> </h5>
              <h5> <strong>Running Time:</strong> <span id='show-data'> {runtime} Mins </span> </h5>
            </div>
            <div className='large-6 large-offset-2 columns data-info'>
              {box_season}
              <h5> <strong>Rating:</strong> <span id='show-data'> {vote} </span> </h5>
            </div>
          </div>
          </center>

        </div>
        </div>

      </div>
    )
  }
}


export default MediaShow
