import React, { Component } from 'react';
import { Link } from 'react-router';
import FooterContainer from './FooterContainer'
import Navigation from '../components/Navigation'


class NavContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      menuSelected: false,
      menuButton: 'mobile-menu-icon.svg'
    }
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick() {
    if (this.state.menuSelected == false) {
      this.setState({
        menuSelected: true,
        menuButton: 'mobile-menu-icon-close.svg'
      })
    } else {
      this.setState({
        menuSelected: false,
        menuButton: 'mobile-menu-icon.svg'
      })
    }
  }

  render() {
    let className;
    if (this.state.menuSelected) {
      className = 'selected'
    } else {
      className = 'hidden'
    }

    return(
      <div>
        <Navigation
          handleClick={this.handleMenuClick}
          className={className}
          menuButton={this.state.menuButton}
        />
        {this.props.children}
        <FooterContainer />
      </div>
    )
  }
}

export default NavContainer
