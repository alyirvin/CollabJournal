import React from 'react';
import './landing.css';
const LandingPage = () => {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>Landing Page</title>
      <link rel="stylesheet" href="landing.css" /> 
      <link href="https://fonts.googleapis.com/css?family=Krona One" rel="stylesheet" />
      <div className='background'>
        <div className="spiral-container">
          <img src={require("./images/spiral-bind.png")} alt="spiral" />    
        </div>
        <div className="right-side">        
          <div className="button-container">
            <a className="button button-prop" href="login">
            <div id="button-text">LOG IN</div>
            </a>
            <p className="text">OR</p>
            <a className="button button-prop" href="createacc">
              <div id="button-text">CREATE ACCOUNT</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;