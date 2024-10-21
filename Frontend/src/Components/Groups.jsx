import React, {useState} from 'react';
import axios from 'axios';
import './groups.css';
import spiralSmall from './images/spiral-bind-short.png';
import MiniJournal from './MiniJournal'
const Groups = () => {
    return(
        <div className="groupsContainer">
            <div className="title">
                MY JOURNALS
            </div>         
            <MiniJournal />
            <MiniJournal />
        </div>
    
    )
}

export default Groups
