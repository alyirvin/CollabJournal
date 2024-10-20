import React, {useState} from 'react';
import axios from 'axios';
import './reset.css';
import spirals from './../../images/spirals.png';

const Reset = () => {
    return(
      <div className="resetContainer">
        <div className="containerSpiral">
          <img src={spirals} alt="spirals" id="spirals"/>
        </div>
        <p className="title">RESET PASSWORD</p>
        <div className="containerOne">
          <label className="textTwo">New Password</label>
          <input className="input" />
          <p />
          <label className="textTwo">Confirm New Password</label>
          <input className="input" />
        </div>
        <p />
        <button className="button">
          <a className="button-prop" href="login.html">
            <div id="button-text">LOG IN</div>
          </a>
        </button>
      </div>
    )
}

export default Reset