import React, { Component } from 'react';
import { Link } from 'react-router';
import AllMedia from '../components/AllMedia';
import AllLists from '../components/AllLists';
import ListCard from '../components/ListCard';
import SearchBox from '../components/SearchBox';
import UserInfo from '../components/UserInfo';

class MainContainer extends Component{
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
    this.handleListNameChange = this.handleListNameChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.listNameSubmit = this.listNameSubmit.bind(this)
    this.handleDeleteMedia = this.handleDeleteMedia.bind(this)
    this.handleDeleteList = this.handleDeleteList.bind(this)
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
        currentMedia: [data.results[0], ...this.state.currentMedia],
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
    .catch((err) => console.log('Error') )
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
      this.setState({ title: '' })
    } else {
      let searchPayload = {
        title: this.state.original_name,
        data_id: this.state.id,
        overview: this.state.overview,
        poster_path: this.state.poster_path,
        release_date: this.state.first_air_date
      }
      this.sendSearch(searchPayload)
      this.setState({ title: '' })
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
    .then(this.handleListSubmit())
  }

  // start of list functions
  componentDidMount() {
    this.getUserData()
  }

  // fetch data from lists api controller - index
  getUserData() {
    let userId = this.props.params.id
    fetch(`/api/v1/users/${userId}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          lists: responseData.lists,
          media: responseData.media,
          current_user: responseData.user[0]
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

  // called from 'sendSearch' - each time a user searches for media, this way we do not need a 'save' button
  handleListSubmit() {
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
    this.getLatestMedia()
    if (id !== this.state.selectedId) {
      let media = this.state.media
      let currentMediaArray = media.filter((item) => {
        return item.list_id === id
      })
      this.setState({ selectedId: id, listName: name, currentMedia: currentMediaArray, showCreate: false })
    } else if (id === this.state.selectedId) {
      this.setState({ selectedId: 0, listName: '', currentMedia: [], showCreate: false})
    }
  }

  // called from 'handleClick' - this function is needed so that when a new list item is added or deleted, it will remain that way even if user navigates to another list (otherwise list is only dependent on state and a page reload will be required)
  getLatestMedia() {
    fetch(`/api/v1/lists`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          media: responseData.media
        })
    });
  }

  // bound to 'create new list' button in AllLists, displays create input on click
  handleCreate() {
    this.setState({ showCreate: true, selectedId: 0, listName: '', currentMedia: [] })
  }

  // bound to create button in searchBox.js
  listNameSubmit(e) {
    e.preventDefault()
    this.handleListSubmit()
  }

  // bound to media delete button on MediaCard, takes in an argument of media id, sent to media api controller - destroy
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

  // bound to list delete button on ListCard, takes in an argument of list id, sent to list api controller - destroy
  handleDeleteList(id) {
    let listId = id
    fetch(`/api/v1/lists/${listId}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => this.removeListFromPage(id))
  }

  // called from handleDeleteList, dynamically deletes selected list from page
  removeListFromPage(id) {
    let currentLists = this.state.lists
    let newListArray = currentLists.filter((list) => {
      return list.id !== id
    })
    this.setState({ lists: newListArray })
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
              <AllLists
              lists = {this.state.lists}
              handleClick = {this.handleClick}
              handleCreate = {this.handleCreate}
              selectedBackgroundId = {this.state.selectedBackgroundId}
              selectedId = {this.state.selectedId}
              handleDeleteList = {this.handleDeleteList}
              />
          </div>
          <div className="large-8 large-offset-3 columns" id="offset-column">
            <AllMedia
              mediaValue = {this.state.mediaValue}
              handleTitleChange = {this.handleTitleChange}
              handleTitleSubmit = {this.handleSubmit}

              listNameValue = {this.state.listName}
              listName = {this.state.listName}
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

export default MainContainer
