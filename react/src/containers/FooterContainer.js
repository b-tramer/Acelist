import React from 'react';
import { Link } from 'react-router';

class FooterContainer extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="footer">
        <div className="row">

          <div className="small-12 large-6 columns" id="footer-area">
            <ul>
              <li>1 Wigglesworth Street</li>
              <li>Boston, Massachusetts</li>
            </ul>
          </div>

          <div className="small-12 large-6 columns" id="footer-area">
            <ul>
              <li id="loop">STAY IN THE LOOP</li>
              <li> <input type="text" placeholder="EMAIL" id="email-search-box"/> </li>
              <li> <button type="button" className="button" id="email-submit-box"> ⟶ </button> </li>
            </ul>
          </div>

        </div>
        </div>
    )
  }
}

export default FooterContainer
