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
          <div className="show-for-small-only">
            <div className="row" id="info-area-one-small">
              <div className="small-12 large-6 columns">
                <img src={assetHelper["acelist-gif4.gif"]} height="600" width="600" id='home-gif-small'/>
              </div>
            </div>

              <div className="row" id="info-area-one-small">
                <div className="small-6 large-6 columns">
                  <img src="./list.svg" height="60" width="60"/> <h4> Name Your List </h4>
                </div>

                <div className="small-6 large-6 columns">
                  <img src="./search.svg" height="60" width="60"/> <h4>  Search For Media </h4>
                </div>
              </div>


            <div className="row" id="info-area-two-small">
              <div className='small-12 large-6 columns'>
                <img src={assetHelper["rec-gif.gif"]} height="600" width="600" id='home-gif-small'/>
              </div>
            </div>

            <div className="row" id="info-area-two-small">

              <div >
                <div className="small-6 large-6 columns">
                  <img src="./home-rec.svg" height="60" width="60"/> <h4> Get Recommendations </h4>
                </div>

                <div className="small-6 large-6 columns">
                  <img src="./share.svg" height="60" width="60"/> <h4>  Share With Friends </h4>
                </div>
              </div>

            </div>






            <div id="started-area">
              <Link to={`/users/${userId}`}> <h6> <button type="button" className="button" id="get-started-button-info">GET STARTED</button> </h6> </Link>
            </div>

          </div>




          <div className="show-for-medium">
            <div className="row" id="info-area-one">
              <div className="small-12 large-6 columns">
                <img src={assetHelper["acelist-gif4.gif"]} height="600" width="600" id='home-gif'/>
              </div>
              <div className="small-12 large-6 columns">
                <h4> <img src="./list.svg" height="70" width="70"/>  Name Your List </h4>
                <h4>   <img src="./search.svg" height="70" width="70"/>  Search For Media </h4>
              </div>
            </div>

            <div className="row" id="info-area-two">
              <div className='small-12 large-6 columns'>
                <h4> Get Recommendations <img src="./home-rec.svg" height="70" width="70"/> </h4>
                <h4> Share With Friends <img src="./share.svg" height="70" width="70"/> </h4>
              </div>
              <div className='small-12 large-6 columns'>
                <img src={assetHelper["rec-gif.gif"]} height="600" width="600" id='home-gif'/>
              </div>
            </div>
            <div id="started-area">
              <Link to={`/users/${userId}`}> <h6> <button type="button" className="button" id="get-started-button-info">GET STARTED</button> </h6> </Link>
            </div>
          </div>
        </div>
      )
    }
  }

export default InfoArea;
