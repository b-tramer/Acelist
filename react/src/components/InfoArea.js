import React from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

  class InfoArea extends React.Component{
    constructor(props){
      super(props);
      this.state = {}
    }

    componentDidMount() {
      this.getUserData()
    }

    // get current users id so that when 'get started' button is clicked, it either directs to their profile or, if they aren't signed in, the ability to sign in or sign up
    getUserData() {
      fetch(`/api/v1/users`, { credentials: 'same-origin' })
        .then(response => response.json())
        .then(responseData => {
          this.setState({ user: responseData.current_user.id })
      });
    }

    render() {
      let userId = this.state.user
      return(
        <div>
        <div className="row" id="info-area">
        <div className="small-12 large-4 columns">
        <img src="./search.svg" height="90" width="90"/>
        <h5> Search Movies & Shows </h5>
        </div>

        <div className="small-12 large-4 columns">
        <img src="./list.svg" height="90" width="90"/>
        <h5> Create Custom Lists </h5>
        </div>

        <div className="small-12 large-4 columns">
        <img src="./share.svg" height="90" width="90"/>
        <h5> Save & Share With Friends </h5>
        </div>
        </div>

        <div id="started-area">
        <Link to={`/users/${userId}`}> <h6> <button type="button" className="button" id="get-started-button-info">GET STARTED</button> </h6> </Link>
        </div>
        </div>
      )
    }
  }

export default InfoArea;