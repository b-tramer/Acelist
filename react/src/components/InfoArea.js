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
      // <div id="started-area">
      //   <Link to={`/users/${userId}`}> <h6> <button type="button" className="button" id="get-started-button-info">GET STARTED</button> </h6> </Link>
      // </div>
      return(
        <div>
          <div className="row" id="info-area">

          <div className="small-12 large-6 columns">
            <img src={assetHelper["acelist-gif3.gif"]} height="600" width="600" id='home-gif'/>
          </div>

          <div className="small-12 large-6 columns">
            <h4> <img src="./list.svg" height="70" width="70"/>  Name Your List </h4>
            <h4>   <img src="./search.svg" height="70" width="70"/>  Search For Media </h4>
            <h4><img src="./share.svg" height="70" width="70"/>  Share With Friends </h4>
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
