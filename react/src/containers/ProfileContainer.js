import React, { Component } from 'react';
import { Link } from 'react-router';
import AllMedia from '../components/AllMedia';
import AllLists from '../components/AllLists';
import ListCard from '../components/ListCard';
import SearchBox from '../components/SearchBox';
import UserInfo from '../components/UserInfo';

class ProfileContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      current_user: {},
      lists: [],
      media: [],
      selectedId: 0,
      currentMedia: [],
      listName: '',
      showCreate: false,
      selectedBackgroundId: 'list-button'
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleListSubmit = this.handleListSubmit.bind(this)
    this.handleListNameChange = this.handleListNameChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.listNameSubmit = this.listNameSubmit.bind(this)
    this.handleDeleteMedia = this.handleDeleteMedia.bind(this)
  }

  // bound to 'search' for media in SearchBox
  handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.themoviedb.org/3/search/multi?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=1&include_adult=false&query==${this.state.title}`
    this.fetchAPI(url)
  }

  // triggered from search submit, fetches data from external API based on search input
  fetchAPI(url) {
    fetch(url)
    .then(response => response.json())
    .then(data =>
      this.setState({
        currentMedia: [...this.state.currentMedia, data.results[0]],
        id: data.results[0].id,
        send_title: data.results[0].title,
        overview: data.results[0].overview,
        poster_path: data.results[0].poster_path,
        release_date: data.results[0].release_date,
        media_type: data.results[0].media_type,
        original_name: data.results[0].original_name,
        first_air_date: data.results[0].first_air_date
       }))
    .then(responseData => this.componentWillReceiveProps(responseData))
    .catch((err) => console.log('oh no!') )
  }

  // triggered from fetchAPI
  componentWillReceiveProps() {
    this.sendSearchPayload()
  }

  // prepares media payload to be sent to media api controller
  sendSearchPayload() {
    if (this.state.media_type === "movie") {
      let searchPayload = {
        title: this.state.send_title,
        data_id: this.state.id,
        overview: this.state.overview,
        poster_path: this.state.poster_path,
        release_date: this.state.release_date
      }
      this.sendSearch(searchPayload)
    } else {
      let searchPayload = {
        title: this.state.original_name,
        data_id: this.state.id,
        overview: this.state.overview,
        poster_path: this.state.poster_path,
        release_date: this.state.first_air_date
      }
      this.sendSearch(searchPayload)
    }
  }

  // send media search payload to media api controller - create
  sendSearch(searchPayload) {
    fetch("/api/v1/media", {
      method: "POST",
      credentials: 'same-origin',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchPayload)
    })
  }

  // start of list functions
  componentDidMount() {
    this.getUserData();
  }

  // fetch data from users api controller - index
  getUserData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          current_user: responseData.user,
          lists: responseData.lists,
          media: responseData.media
        })
    });
  }

  // set the state of listName onChage in SearchBox
  handleListNameChange(event) {
    this.setState({ listName: event.target.value })
  }

  // set the state of title onChange in SearchBox
  handleTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  // bound to 'save' button as onSubmit in SearchBox
  handleListSubmit(event) {
    event.preventDefault()
    let jsonPayload = {
      name: this.state.listName,
      user_id: this.state.current_user.id,
      media_attributes: this.state.currentMedia
    }
    this.sendList({list: jsonPayload})
  }

  // send the list name, user id, and media attributes to the list api controller
  sendList(jsonPayload) {
    fetch("/api/v1/lists", {
      method: "POST",
      credentials: 'same-origin',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonPayload)
    })
    .then(response => response.json())
    .then(data =>
      this.setState({
        lists: [...this.state.lists, data]
       }))
  }

  // when a list name is clicked, it sets the state of 'selectedId' to the list's id. Then filters out all matching media and put into new array
  handleClick(id, name) {
    if (id !== this.state.selectedId) {
      let media = this.state.media
      let currentMediaArray = media.filter((item) => {
        return item.list_id === id
      })
      this.setState({ selectedId: id, listName: name, currentMedia: currentMediaArray })
    } else if (id === this.state.selectedId) {
      this.setState({ selectedId: 0, listName: '', currentMedia: [] })
    }
  }

  // bound to 'create new list' button in AllLists, displays create input on click
  handleCreate() {
    if (this.state.showCreate === false) {
      this.setState({ showCreate: true })
    } else {
      this.setState({ showCreate: false })
    }
  }

  // bound to create button, prevents page reload
  listNameSubmit(e) {
    e.preventDefault()
  }

  // bound to delete button on MediaCard, takes in an argument of media id, sent to media api controller - destroy
  handleDeleteMedia(id) {
    let mediaId = id
    fetch(`/api/v1/media/${mediaId}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => this.removeMediaFromPage(id))
  }

  // called from handleDeleteMedia, dynamically deletes selected item from page
  removeMediaFromPage(id) {
    let currentMedia = this.state.currentMedia
    let newMediaArray = currentMedia.filter((item) => {
      return item.id !== id
    })
    this.setState({ currentMedia: newMediaArray })
  }

  render() {
    let showCreateClass;
    if (this.state.showCreate === false) {
      showCreateClass = 'hidden'
    } else {
      showCreateClass = 'show'
    }
    return(
      <div  id="profile-main-div">
          <UserInfo
            user = {this.state.current_user}
          />
          <div className="row">
            <div className="large-4 columns">
              <AllLists lists = {this.state.lists} handleClick = {this.handleClick} handleCreate = {this.handleCreate} selectedBackgroundId = {this.state.selectedBackgroundId} selectedId = {this.state.selectedId}/>
          </div>
          <div className="large-8 large-offset-3 columns" id="offset-column">
            <AllMedia
              mediaValue = {this.state.mediaValue}
              handleTitleChange = {this.handleTitleChange}
              handleTitleSubmit = {this.handleSubmit}

              listNameValue = {this.state.listName}
              listName = {this.state.listName}
              handleListSubmit = {this.handleListSubmit}
              handleListNameChange = {this.handleListNameChange}
              listNameSubmit = {this.listNameSubmit}

              handleDeleteMedia = {this.handleDeleteMedia}
              showCreateClass = {showCreateClass}
              media = {this.state.currentMedia}
            />
          </div>
        </div>


      </div>
    )
  }
}

export default ProfileContainer
