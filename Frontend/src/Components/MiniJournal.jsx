import React, {useState} from 'react';
import axios from 'axios';
import './miniJournal.css';
import spiralSmall from './images/spiral-bind-short.png';
import { Link } from 'react-router-dom';

const MiniJournal = () => {
    return(
        <div className="miniJournalContainer">
                <div className="journal-container">

                    <div className="journal-item-container">
                        <button className="delete-button">x</button>
                        <div className="spiral-container">
                            <img src={spiralSmall} alt="spiralSmall"/>
                        </div>

                        <div className="journal-name-container">
                            <input 
                                type="text" 
                                id="journal-name" 
                                maxLength="20"
                            /> 
                        </div>

                        <div className="button-container">
                            <button className="button">
                                <a className="button-prop" href="journal-info.html">
                                    <div id="button-text">INFO</div>
                                </a>
                            </button>

                            <button className="button">
                                <Link className="button-prop" to="/JournalOpen">
                                    <div id="button-text">OPEN</div>
                                </Link>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
    
    )
}

export default MiniJournal