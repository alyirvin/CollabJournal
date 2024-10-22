import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './groups.css';
import MiniJournal from './MiniJournal';
import CreateJournalPopup from './CreateJournalPopup'; // Import CreateJournalPopup

const Groups = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [journals, setJournals] = useState([]);
    const [userId, setUserId] = useState(null); // State to store userId

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        console.log("Stored userId from localStorage:", storedUserId); // Debug log
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                console.log("Fetching journals for userId:", userId); // Debug log
                const response = await axios.get('http://localhost:5001/GetJournals', { params: { userId } });
                console.log("Fetched journals response:", response); // Debug log
                console.log("Fetched journals data:", response.data); // Debug log
                setJournals(response.data);
            } catch (error) {
                console.error("Error fetching journals:", error);
            }
        };
        if (userId) {
            fetchJournals();
        }
    }, [userId]);

    const handleJournalCreated = async () => {
        try {
            console.log("Fetching journals after creation for userId:", userId); // Debug log
            const response = await axios.get('http://localhost:5001/GetJournals', { params: { userId } });
            console.log("Fetched journals after creation response:", response); // Debug log
            console.log("Fetched journals after creation data:", response.data); // Debug log
            setJournals(response.data);
        } catch (error) {
            console.error("Error fetching journals:", error);
        }
    };

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
