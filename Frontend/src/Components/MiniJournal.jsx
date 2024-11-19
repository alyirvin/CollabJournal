import React, {useState} from 'react';
import axios from 'axios';
import './miniJournal.css';
import spiralSmall from './images/spiral-bind-short.png';
import { Link } from 'react-router-dom';
//TODO: display name on the notebook
const MiniJournal = ({journal, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedJournal, setEditedJournal] = useState({
        name: journal.name,
        description: journal.description,
    })
    const handleDelete = async () => {
        try {
            console.log(`Attempting to delete journal with ID: ${journal._id}`);
            const response = await axios.delete(`http://localhost:5001/api/journals/${journal._id}`);
            console.log('Delete response:', response.data);
            onDelete(journal._id);
        } catch(error) {
            console.error("Error deleting journal:", error);
        }
    }


    return (
        <div className="miniJournalContainer">
            <div className="journal-container">
                <div className="journal-item-container">
                    <button className="delete-button" onClick={handleDelete}>x</button>
                    <div className="spiral-container">
                        <img src={spiralSmall} alt="spiralSmall" />
                    </div>
                    <div className="journal-name-container">
                        <a className="journal-name">
                            {journal.name} 
                        </a>
                    </div>
                    <div className="journal-info-container">
                        <a className="journal-info">
                            {journal.description} 
                        </a>
                    </div>
                    <div className="button-container">
                        <button className="button">
                            <Link className="button-prop" to={`/journal-edit/${journal._id}`}>
                                <div id="button-text">EDIT</div>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiniJournal