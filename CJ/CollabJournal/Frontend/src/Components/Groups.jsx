import React, {useState} from 'react';
import axios from 'axios';
import './groups.css';
import MiniJournal from './MiniJournal'
const Groups = () => {
    return(
        <div className="groupsContainer">
            <div className="title">
                MY JOURNALS
            </div>

            <div className="journal-button-container">
                <div className="miniJournalContainer">       
                    <MiniJournal />
                    <MiniJournal />
                </div> 

                <div className="add-button">
                    <button className="add-journal-button">+</button>
                </div>
            </div> 
        </div>
    
    )
}

export default Groups
