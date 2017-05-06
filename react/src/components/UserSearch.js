import React from 'react';
import { browserHistory, Link } from 'react-router';

const UserSearch = (props) => {
  return(
    <div className="small-12 columns" id="user-search-bar">
      <form>
        <input name="query" type="text" onChange={props.onChange} value={props.query} placeholder= 'Search Users...'/>
      </form>
    </div>
  )
}

export default UserSearch
