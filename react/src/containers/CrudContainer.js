import React from 'react'
import SearchBox from '../components/SearchBox'
import AllMedia from '../components/AllMedia'

class CrudContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      media: [],
      listName: '',
      current_user: {}
    }
    // this.handleTitleChange = this.handleTitleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleListNameChange = this.handleListNameChange.bind(this);
    // this.handleListSubmit = this.handleListSubmit.bind(this);
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    fetch(`/api/v1/media`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ media: responseData.media, current_user: responseData.user })
    });
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   let url = `https://api.themoviedb.org/3/search/multi?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=1&include_adult=false&query==${this.state.title}`
  //   this.fetchAPI(url)
  // }

  // fetchAPI(url) {
  //   fetch(url)
  //   .then(response => response.json())
  //   .then(data =>
  //     this.setState({
  //       media: [...this.state.media, data.results[0]],
  //       id: data.results[0].id,
  //       send_title: data.results[0].title,
  //       overview: data.results[0].overview,
  //       poster_path: data.results[0].poster_path,
  //       release_date: data.results[0].release_date,
  //       media_type: data.results[0].media_type
  //      }))
  //   .then(responseData => this.componentWillReceiveProps(responseData))
  //   .catch((err) => console.log('oh no!') )
  //   }

  // componentWillReceiveProps() {
  //   this.sendSearchPayload()
  // }

  // sendSearchPayload() {
  //   let searchPayload = {
  //     title: this.state.send_title,
  //     data_id: this.state.id,
  //     overview: this.state.overview,
  //     poster_path: this.state.poster_path,
  //     release_date: this.state.release_date
  //   }
  //   this.sendSearch(searchPayload)
  // }

  // sendSearch(searchPayload) {
  //   console.log(searchPayload)
  //   fetch("/api/v1/media", {
  //     method: "POST",
  //     credentials: 'same-origin',
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(searchPayload)
  //   })
  // }

  // handleTitleChange(event) {
  //   this.setState({ title: event.target.value })
  // }

  render() {
    return(
      <div className="about">
        <div className="search-component">
          <center> <h2> Search For A Title </h2> </center>
        </div>

          <AllMedia
            // mediaValue = {this.state.title}
            handleTitleChange = {this.handleTitleChange}
            handleTitleSubmit = {this.handleSubmit}

            media = {this.state.media}
          />

      </div>
    )
  }

}

export default CrudContainer
