import React, {useState} from 'react';
import './landing.css';
import spiralBind from './../../images/spiralBind.png';
import logo from './../../images/logo.png';
import { Link } from 'react-router-dom';


const Landing = () => {

    return (
        <div className = "landingContainer">

            <div className = "spiral-container">

                <img src={spiralBind} alt="spiral" id="spiral"/>    

            </div>

            <div className = "right-side">        

                <div className = "button-container">

                    <button className="button">
                        <Link className="button-prop" to="/Login">
                        <div id="button-text">LOG IN</div>
                        </Link>
                    </button>

                    <p className="text">OR</p>

                    <button className="button">
                        <Link className="button-prop" to="/Signup">
                        <div id="button-text">CREATE ACCOUNT</div>
                        </Link> 
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
