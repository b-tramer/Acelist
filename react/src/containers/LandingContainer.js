import React, { Component } from 'react';
import { Link } from 'react-router';
import InfoArea from '../components/InfoArea';
import ScrollableAnchor from 'react-scrollable-anchor'

class LandingContainer extends Component{
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
      showLogin = <Link to={`/users/${userId}`}> <p> <button type="button" id='get-started-button-landing'> <img src={profilePicture} height="40px" width="40px"/>  My Profile → </button> </p> </Link>
    } else {
      showLogin = <div className='landing-fb-button'> <h3 id="login-button-fb"> <a id="sign_in" href="/auth/facebook"><img src={assetHelper["fb-login-two.svg"]} width="300px"/></a> </h3> </div>
    }
    return(
      <div>
        <div className='landing-top-div'></div>
          <div className='row' id='signup-row'>
            <div className='small-12 large-centered columns'>
              <h1> Life’s Better Listed </h1>
              <h4> Save & Share Your Favorite Movies & TV Shows </h4>
              {showLogin}

              <a href='#anchor-info'> <p> <img src={assetHelper["info-button.svg"]} height="20" width="20"/> How Does It Work? </p> </a>
            </div>
          </div>

          <ScrollableAnchor id={'anchor-info'}>
          <p id='anchor'> a </p>
          </ScrollableAnchor>

          <InfoArea/>
      </div>

    )
  }
}

export default LandingContainer
