import React from 'react';
import TopBarContainer from './TopBarContainer';
import MainContentContainer from './MainContentContainer';
import FooterContainer from './FooterContainer';
import FormContainer from './FormContainer';

class App extends React.Component{
  constructor(props) {
    super(props)
  }

  render(){

    return(
      <div className="main-body">

        <div className="navigation">
          <TopBarContainer/>
        </div>

        <div className="form">
          <FormContainer />
        </div>

        <div className="main-content">
          <MainContentContainer />
        </div>

        <div>
        </div>

        <div className="footer">
          <FooterContainer/>
        </div>

      </div>
    )
  }
}

export default App;
