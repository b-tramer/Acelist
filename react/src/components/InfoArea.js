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
          this.setState({ user: responseData.current_user.id, userImage: responseData.current_user.image })
      });
    }

    render() {
      let userId = this.state.user
      let profilePicture = this.state.userImage + "/picture?type=large"
      let showLogin;
      if (this.state.userImage) {
        showLogin = <Link to={`/users/${userId}`}> <p> <button type="button" id='get-started-button-two'> <img src={profilePicture} height="40px" width="40px"/>  My Profile → </button> </p> </Link>
      } else {
        showLogin = <h3 id="half-fb-button"> <a id="sign_in" href="/auth/facebook"><img src={assetHelper["fb-login-two.svg"]} width="300px"/></a> </h3>
      }
      return(
        <div className='info-area-master' id='info-area-master'>
          <div className="show-for-small-only">
            <div className="row" id="info-area-title">
              <div className='small-12 large-12 columns'>
                
              </div>
            </div>

            <div className="row" id="info-area-one-small">
              <div className="small-12 large-6 columns">
                <img src={assetHelper["acelist-gif4.gif"]} height="600" width="600" id='home-gif-small-one'/>
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
                <img src={assetHelper["rec-gif2.gif"]} height="600" width="600" id='home-gif-small'/>
              </div>
            </div>

            <div className="row" id="info-area-two-small">
              <div>
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

              <div className="small-12 large-6 columns" id='info-area-gif-column'>
                <img src={assetHelper["acelist-gif4.gif"]} id='home-gif'/>
              </div>

              <div className='info-outer'>
                <div className="small-12 large-6 columns" id='info-area-description-one'>
                  <img src="./list.svg" height="70" width="70"/>
                  <h4 id='name-your-list'> Name Your List </h4>
                  <img src="./search.svg" height="70" width="70"/>
                  <h4> Search For Media </h4>
                </div>
              </div>
            </div>

            <div className='info-area-half'>

            </div>

            <div className="row" id="info-area-two">
            <div className='small-12 large-6 columns' id='info-area-gif-column'>
              <img src={assetHelper["rec-gif2.gif"]} id='home-gif'/>
            </div>

              <div className='info-outer'>
                <div className='small-12 large-6 columns' id='info-area-description-two'>
                  <img src="./home-rec.svg" height="70" width="70"/>
                  <h4 id='get-recommendations'> Get Recommendations </h4>
                  <img src="./share.svg" height="70" width="70"/>
                  <h4> Share With Friends </h4>
                </div>
              </div>

            </div>

          </div>
        </div>
      )
    }
  }

export default InfoArea;
