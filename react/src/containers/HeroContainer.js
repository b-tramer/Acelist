import React, { Component } from 'react';
import { Link } from 'react-router';
import InfoArea from '../components/InfoArea'

class HeroContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      heroOne: 'show',
      heroTwo: 'hidden'
    }
    this.heroSwitch = this.heroSwitch.bind(this)
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

  heroSwitch() {
    if (this.state.heroOne === 'show') {
      this.setState({ heroOne: 'hidden', heroTwo: 'show' })
    } else {
      this.setState({ heroOne: 'show', heroTwo: 'hidden' })
    }
  }

  render() {
    let userId = this.state.user
    let profilePicture = this.state.userImage + "/picture?type=large"
    let showLogin;
    if (this.state.userImage) {
      showLogin = <Link to={`/users/${userId}`}> <p> <button type="button" id='get-started-button'> <img src={profilePicture} height="40px" width="40px"/>  My Profile → </button> </p> </Link>
    } else {
      showLogin = <h3 id="login-button-fb"> <a id="sign_in" href="/auth/facebook"><img src={assetHelper["fb-login.svg"]} width="300px"/></a> </h3>
    }
    return(
      <div>
        <div className={this.state.heroOne}>
          <div className='information'>
            <div className='row'>
                <div className='hero-text'>
                  <h1> Life’s Better Listed </h1>
                  <h4> Save & Share Your Favorite Movies & TV Shows </h4>
                  {showLogin}
                </div>
            </div>
            <center>
              <div className='toggle-hero'>
                <h3 onClick={this.heroSwitch}>⟵  ⟶</h3>
              </div>
            </center>
          </div>
        </div>

        <div className={this.state.heroTwo}>
          <div className='information-two'>
            <div className='row'>
                <div className='hero-text'>
                  <h1> Life’s Better Organized </h1>
                  <h4> Keep Track Of Your Favorite Movies & TV Shows </h4>
                  <Link to={`/users/${userId}`}>
                  {showLogin}
                 </Link>
                </div>
            </div>
            <center>
              <div className='toggle-hero'>
                <h3 onClick={this.heroSwitch}>⟵  ⟶</h3>
              </div>
            </center>
          </div>
        </div>

        <InfoArea />
      </div>

    )
  }
}

export default HeroContainer
