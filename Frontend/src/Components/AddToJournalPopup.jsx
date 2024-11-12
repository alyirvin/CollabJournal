import React, { useState } from 'react';
import axios from 'axios';
import './createJournalPopup.css';
const AddToJournalPopup = ({ onClose, onJournalAdded, userId}) => {
    const [journalName, setJournalName] = useState('');
    const [journalKey, setJournalKey] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async(e) => {
        e.preventDefault()
        try { 
            //FIXME: changed
            const res = await axios.post('http://localhost:5001/AddToJournal', {userId, journalName, journalKey })
            if(res.data === "Journal added") {
                alert("Journal Added!")
                // onJournalAdded()
                // onClose()
            }
            else if(res.data === "Journal already added") {
                alert("You already have this journal!")
            }
            else if (res.data === "Journal not found") {
                alert("Invalid Journal Key combination. Please try again.")
            }
            else {
                setMessage(res)
            }
            onJournalAdded(); // Notify parent component about the new journal
            onClose(); // Close the popup
        } catch(e) {
            alert(e);
            setMessage(e.response.data)
        }
    }
    return (
        <div className="popup-container"> 
            <div className="popup-content">
                <h2> Add to Journal </h2>
                <form onSubmit={handleSubmit}>
                    <label>Journal Name:</label>
                    <input
                        type="text"
                        value={journalName}
                        onChange={(e) => setJournalName(e.target.value)}  
                        required
                    />
                    <label> Journal Pin: </label>
                    <input
                        type="text"
                        value={journalKey}
                        onChange={(e) => setJournalKey(e.target.value)}
                        required
                    />
                    <button type="submit"> ADD </button>
                    <button type="button" onClick={onClose}> CANCEL </button> 
                    {message && <p>{message}</p>}
                </form>
            </div>
        </div>
    )
}

export default AddToJournalPopup