import React, { Component } from 'react';
import { Link } from 'react-router';
import AllMedia from '../components/AllMedia';
import AllLists from '../components/AllLists';
import ListCard from '../components/ListCard';
import SearchBox from '../components/SearchBox';
import UserInfo from '../components/UserInfo';
import FollowContainer from '../containers/FollowContainer';

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
      mediaListAll: [],
      listName: '',
      showCreate: false,
      selectedBackgroundId: 'list-button',
      current: {},
      showSearch: false,
      errors: {}
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleListNameChange = this.handleListNameChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.listNameSubmit = this.listNameSubmit.bind(this)
    this.handleDeleteMedia = this.handleDeleteMedia.bind(this)
    this.handleDeleteList = this.handleDeleteList.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
  }

  // bound to 'search' for media in SearchBox
  handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.themoviedb.org/3/search/multi?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=1&include_adult=false&query==${this.state.title}`
    this.fetchAPI(url)
  }

  // bound to rec tile - each item can be added when clicked
  handleClickSubmit(title) {
    let url = `https://api.themoviedb.org/3/search/multi?api_key=4ce5312dd9fd3f292ee4e7597f92342c&language=en-US&page=1&include_adult=false&query==${title}`
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
        release_date: this.state.release_date,
        media_type: this.state.media_type
      }
      this.sendSearch(searchPayload)
    } else {
      let searchPayload = {
        title: this.state.original_name,
        data_id: this.state.id,
        overview: this.state.overview,
        poster_path: this.state.poster_path,
        release_date: this.state.first_air_date,
        media_type: this.state.media_type
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
        console.log(responseData)
        this.setState({
          lists: responseData.lists,
          current_user: responseData.user[0],
          current: responseData.current,
          follow_boolean: responseData.follow_boolean
        })
    });
  }

  // set the state of listName onChage in SearchBox
  handleListNameChange(event) {
    this.validateListNameChange(event.target.value);
    this.setState({ listName: event.target.value })
  }

  // make it so a user cannot submit an empty list or a list with a title greater than 20 characters
  validateListNameChange(name) {
    if (name === '' || name === ' ' ) {
      let newError = { name: 'List must be given a name' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else if (name.length > 21) {
      let newError = { name: 'List name cannot be greater than 20 characters' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else {
      let errorState = this.state.errors;
      delete errorState.name;
      this.setState({ errors: errorState });
      return true;
    }
  }

  // set the state of title onChange in SearchBox
  handleTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  // called from 'sendSearch' - each time a user searches for media, this way we do not need a 'save' button
  handleListSubmit() {
    if (this.validateListNameChange(this.state.listName)) {
      let jsonPayload = {
        name: this.state.listName,
        user_id: this.state.current_user.id,
        media_attributes: this.state.currentMedia
      }
      this.sendList({list: jsonPayload})
    }
  }

  // send the list name, user id, and media attributes to the list api controller
  sendList(jsonPayload) {
    fetch("/api/v1/lists", {
      credentials: 'same-origin',
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonPayload)
    })
    .then(response => response.json())
    .then(data =>
      this.setState({
        lists: [...this.state.lists, data],
        title: ''
       }))
  }

  // when a list name is clicked, it sets the state of 'selectedId' to the list's id
  handleClick(id, name) {
    if (id !== this.state.selectedId) {
      this.setState({ selectedId: id, listName: name, showCreate: false, showSearch: true })
      this.getListData(id)
    } else if (id === this.state.selectedId) {
      this.setState({ selectedId: 0, listName: '', currentMedia: [], showCreate: false, showSearch: false })
    }
  }

  // called from handleClick, gets the selected lists media from lists controller - show
  getListData(id) {
    fetch(`/api/v1/lists/${id}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          currentMedia: responseData.media
        })
    });
  }

  // bound to 'create new list' button in AllLists, displays create input on click
  handleCreate() {
    this.setState({ showCreate: true, showSearch: true, selectedId: 0, listName: '', currentMedia: [] })
  }

  // bound to create button in searchBox.js
  listNameSubmit(e) {
    e.preventDefault()
    this.handleListSubmit()
  }

  // bound to media delete button on MediaCard, takes in an argument of media id, sent to media api controller - destroy
  // only deletes the media from the particular instance of the list, so that if users have the same media, it wont delete all occurances of that media
  handleDeleteMedia(id) {
    let listId = this.state.selectedId
    fetch(`/api/v1/media/${id}?listId=${listId}`, {
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
    let showSearchBarClass;
    let mediaDeleteClass;
    let id = +(this.props.params.id)
    if (id === this.state.current.id) {
      showSearchBarClass = 'show'
      mediaDeleteClass = 'delete-media-button'
    } else {
      showSearchBarClass = 'hidden'
      mediaDeleteClass = 'delete-media-button-hidden'
    }

    let showSearch;
    let showCreateClass;
    if (this.state.showCreate === false) {
      showCreateClass = 'hidden'
    } else {
      showCreateClass = 'show'
      showSearch = 'show'
    }

    if (this.state.showSearch === false) {
      showSearch = 'hidden'
    } else {
      showSearch = 'show'
    }

    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      });
      errorDiv = <div className="callout-alert">{errorItems}</div>
    }
    return(
      <div>
        <div id="profile-main-div">

            <FollowContainer
              user = {this.state.current_user}
              current = {this.state.current}
              follow_boolean = {this.state.follow_boolean}
            />
            <div className="row">
              <div className="large-4 columns" id="list-div">
                <AllLists
                lists = {this.state.lists}
                handleClick = {this.handleClick}
                handleCreate = {this.handleCreate}
                selectedBackgroundId = {this.state.selectedBackgroundId}
                selectedId = {this.state.selectedId}
                handleDeleteList = {this.handleDeleteList}
                showSearchBarClass = {showSearchBarClass}
                />
            </div>
            <div className="large-8 large-offset-3 columns" id="offset-column">
            {errorDiv}
              <AllMedia
                mediaValue = {this.state.title}
                handleTitleChange = {this.handleTitleChange}
                handleTitleSubmit = {this.handleSubmit}

                listNameValue = {this.state.listName}
                listName = {this.state.listName}
                handleListNameChange = {this.handleListNameChange}
                listNameSubmit = {this.listNameSubmit}

                handleDeleteMedia = {this.handleDeleteMedia}
                showCreateClass = {showCreateClass}
                media = {this.state.currentMedia}
                showSearchBarClass = {showSearchBarClass}

                mediaDeleteClass = {mediaDeleteClass}
                showSearch = {showSearch}

                handleClickSubmit = {this.handleClickSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainContainer
