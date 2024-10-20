import React, {useState} from 'react';
import './groups.css';
import spiralBindShort from './../../images/spiral-bind-short.png';

const Groups = () => {

    return (
        <div>
            <div className="title">
            MY JOURNALS
            </div>

            <div className="spiral-container">

                <img src={spiralBindShort} alt="sprial" id="spiral"/>    
        
            </div>

            <div className="journal-container">

                <div className="journal-item-container">

                    <div className="journal-name-container">
                        <input type="text" id="journal-name" maxlength="20"/>
                    </div>

                    <div className="button-container">
                        <button className="button">
                            <a className="button-prop" href="journal-info.html">
                            <div id="button-text">INFO</div>
                            </a>
                        </button>

                        <button className="button">
                            <a className="button-prop" href="journal-open.html">
                            <div id="button-text">OPEN</div>
                            </a>
                        </button>
                    </div>

                </div>

                <div className="journal-item-container">
                </div>

            </div>
    </div>

    );
}
export default Groups;