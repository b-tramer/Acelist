import React from 'react'

class RecTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    let title;
    if (this.props.media_type === 'tv') {
      title = this.props.tv_title
    } else {
      title = this.props.title
    }
    let poster = 'https://image.tmdb.org/t/p/w500' + this.props.poster_path
    return(
      <h4 id='rec-tile' onClick={() => this.props.handleClickSubmit(title)} > <img src={poster} height="70px" width="70px"/> {title} </h4>


    )
  }

}

export default RecTile
