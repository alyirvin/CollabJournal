// src/Components/LoginSignup/CreateJournalPopup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './createJournalPopup.css';

const CreateJournalPopup = ({ onClose, onJournalCreated, userId }) => {
    const [journalName, setJournalName] = useState('');
    const [journalDescription, setJournalDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/CreateJournal', {
                userId, // Use the passed userId
                journalName,
                journalDescription
            });
            setMessage(response.data);
            onJournalCreated(); // Notify parent component about the new journal
            onClose(); // Close the popup
        } catch (error) {
            setMessage(error.response.data);
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2>Create a New Journal</h2>
                <form onSubmit={handleSubmit}>
                    <label>Journal Name:</label>
                    <input
                        type="text"
                        value={journalName}
                        onChange={(e) => setJournalName(e.target.value)}
                        required
                    />
                    <label>Journal Description:</label>
                    <textarea
                        value={journalDescription}
                        onChange={(e) => setJournalDescription(e.target.value)}
                        required
                    />
                    <button type="submit">Create Journal</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default CreateJournalPopup;
