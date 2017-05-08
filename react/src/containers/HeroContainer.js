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
        this.setState({ user: responseData.current_user.id })
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
    return(
      <div>

        <div className={this.state.heroOne}>
          <div className='information'>
            <div className='row'>
                <div className='hero-text'>
                  <h1> Life’s Better <em>Listed</em> </h1>
                  <h4> Save & Share Your Favorite Movies & TV Shows </h4>
                  <Link to={`/users/${userId}`}>
                 <button type="button" className="button" id="get-started-button">GET STARTED</button>
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

        <div className={this.state.heroTwo}>
          <div className='information-two'>
            <div className='row'>
                <div className='hero-text'>
                  <h1> Life’s Better <em>Organized</em> </h1>
                  <h4> Keep Track Of Your Favorite Movies & TV Shows </h4>
                  <Link to={`/users/${userId}`}>
                 <button type="button" className="button" id="get-started-button">GET STARTED</button>
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
