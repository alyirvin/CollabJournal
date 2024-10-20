import React, {useState} from 'react';
import './landing.css';
import spiralBind from './../../images/spiralBind.png';
import logo from './../../images/logo.png';

const Landing = () => {

    return (
        <div>

            <div className = "spiral-container">

                <img src={spiralBind} alt="spiral" id="spiral"/>    

            </div>

            <div className = "right-side">        

                <div className = "button-container">

                    <button className="button">
                        <a className="button-prop" href="login.jsx">
                        <div id="button-text">LOG IN</div>
                        </a>
                    </button>

                    <p className="text">OR</p>

                    <button className="button">
                        <a className="button-prop" href="signup.jsx">
                        <div id="button-text">CREATE ACCOUNT</div>
                        </a> 
                    </button>

                </div>
            

            </div>

            <div className="left-side">
                <div>
                    <img id="logo" src={logo} alt="CollabJournal"/>
                </div>
            </div>
        </div>

    );
}
export default Landing;