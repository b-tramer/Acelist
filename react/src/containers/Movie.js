import React from 'react'
import Card from '../components/Card'
import SearchBox from '../components/SearchBox'
import MovieList from './components/MovieList'

class Movie extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      title: 'Toy Story'
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {

    return(
      <div className="about">
      <div className="search-component">
        <center> <h2> Search For A Movie </h2> </center>
      </div>
          <SearchBox
            value = {this.state.title}
            handlerFunction = {this.handleTitleChange}
            handleSubmit = {this.handleSubmit}
          />

          <MovieList
          movies = {this.state.movies}
          data = {this.state}
          />

      </div>
    )
  }

  fetchAPI(url) {
    fetch(url)
    .then(response => response.json())
    .then(data =>
      this.setState({
        title: data.results[0].original_title,
        id: data.results[0].id,
        overview: data.results[0].overview,
        poster_path: data.results[0].poster_path,
        release_date: data.results[0].release_date,
        media_type: data.results[0].media_type,
        tvTitle: data.results[0].name,
        tvAirDate: data.results[0].first_air_date
       }))
       .catch((err) => console.log('oh no!') )
    }

    fetchTitle(title) {
      let url = `https://api.themoviedb.org/3/search/multi?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=1&include_adult=false&query==${title}`
      this.fetchAPI(url)
    }

    componentDidMount() {
      let url = `https://api.themoviedb.org/3/search/multi?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=1&include_adult=false&query=${this.state.title}`
      this.fetchAPI(url)
    }

    handleSubmit(event) {
      event.preventDefault();
      let newMovie = {
        title: this.state.title
      }
      let additionalMovies = [...this.state.movies, newMovie]
      this.setState({
        movies: additionalMovies
      })
      this.fetchTitle(newMovie.title)
    }

    handleTitleChange(event) {
      this.setState({ title: event.target.value })
    }

}

export default Movie




class CreateApps < ActiveRecord::Migration[5.0]
  def change
    create_table :apps do |t|
      t.string :name, null: false
      t.integer :creator_id, null: false
      t.string :url, null: false
      t.text :description, null: false
      t.string :collaborators
      t.string :github_url
      t.string :experience
      t.float :average_rating

      t.timestamps
    end
  end
end
