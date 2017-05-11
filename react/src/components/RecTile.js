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
      <div onClick={() => this.props.handleClickSubmit(title)}>
        <h4 id='rec-tile'> <img src={poster} height="70px" width="70px"/> {title} </h4>
        <img id='add-media-button' src={assetHelper["add-media.svg"]} height="20" width="20"/>
      </div>


    )
  }

}

export default RecTile
