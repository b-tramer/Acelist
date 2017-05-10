import React from 'react'

class RecTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    let poster = 'https://image.tmdb.org/t/p/w500' + this.props.poster_path
    return(
        <h4 id='rec-tile'> <img src={poster} height="70px" width="70px"/> {this.props.title} </h4>
    )
  }

}

export default RecTile
