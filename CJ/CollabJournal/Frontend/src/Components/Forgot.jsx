import React, {useState} from 'react';
import axios from 'axios';
import './forgot.css';
import spirals from './images/spirals.png';

const Forgot = () => {
    return(
        <div className="forgotContainer">
            <div className="containerSpiral">
                <img src={spirals} alt="spirals" id="spirals"/>
            </div>
            <p className="title">FORGOT PASSWORD</p>
            <label className="textOne">
            We'll send you a link to the email address you registered with.
            </label>
        <div className="containerOne">
        <label className="textTwo">Email</label>
        <input className="input" />
        </div>
        <button className="button">
            <a className="button-prop" href="reset.jsx">
                <div id="button-text">SEND EMAIL</div>
            </a>
        </button>
        </div>
    )
}

export default Forgot
