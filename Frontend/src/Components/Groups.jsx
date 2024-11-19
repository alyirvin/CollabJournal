import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './groups.css';
import MiniJournal from './MiniJournal';
import CreateJournalPopup from './CreateJournalPopup';
import AddToJournalPopup from './AddToJournalPopup';
import GroupsAddCreatePopup from './GroupsAddCreatePopup';

const Groups = () => {
    const [journals, setJournals] = useState([]);
    const [userId, setUserId] = useState(null); // State to store userId
    const [showOptionPopup, setShowOptionPopup] = useState(false);
    const [popupType, setPopupType] = useState(null);
    const addButtonRef = useRef(null);
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        console.log("Stored userId from localStorage:", storedUserId); // Debug log
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);
    const handleDelete = (id) => {
        setJournals(journals.filter(journal => journal._id !== id))
    }
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
    const handleOptionClick = (option) => {
        setPopupType(option);
        setShowOptionPopup(false);
    };


    return (
        <div className="groupsContainer">
            <div className="title">
                MY JOURNALS
            </div>
            <div className="journal-button-container">
                <div className="miniJournalContainer"> 
                    {journals.length > 0 ? (
                        journals.map((journal) => (
                            <MiniJournal key={journal._id} journal={journal} onDelete={handleDelete} />
                        ))
                    ) : (
                        <p>No journals found.</p>
                    )}
                </div>
                <div className="add-button">
                    <button ref={addButtonRef} className="add-journal-button" onClick={() => setShowOptionPopup(!showOptionPopup)}>+</button>
                    {showOptionPopup && (
                        <GroupsAddCreatePopup
                            onClose={() => setShowOptionPopup(false)}
                            onCreateNew={() => handleOptionClick('create')}
                            onAddExisting={() => handleOptionClick('add')}
                        />
                    )}
                </div>
            </div>
        

            {popupType === 'create' && (
                <CreateJournalPopup
                    onClose={() => setPopupType(null)}
                    onJournalCreated={handleJournalCreated}
                    userId={userId}
                />
            )}
            {popupType === 'add' && (
                <AddToJournalPopup
                    onClose={() => setPopupType(null)}
                    onJournalAdded={handleJournalCreated}
                    userId={userId}
                />
            )}
        </div>
    );
};

export default Groups;
