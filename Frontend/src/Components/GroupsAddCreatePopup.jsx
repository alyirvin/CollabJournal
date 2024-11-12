import React, { useEffect, useRef, useState } from 'react';
import './groupsAddCreatePopup.css';

const GroupsAddCreatePopup = ({ onClose, onCreateNew, onAddExisting, anchorRef }) => {
    const [popupStyle, setPopupStyle] = useState({});

    useEffect(() => {
        if (anchorRef?.current) {
            const buttonRect = anchorRef.current.getBoundingClientRect();
            setPopupStyle({
                position: 'absolute',
                top: buttonRect.top - buttonRect.height - 10 + window.scrollY,
                left: buttonRect.left + buttonRect.width / 2 + window.scrollX, 
            });
        }
    }, [anchorRef]);

    return (
        <div className="groupsAddPopupContainer" style={popupStyle}>
            <div className="popup-box">
                <button onClick={onClose} className="popup-close-button">X</button>
                <button onClick={onAddExisting} className="popup-button">Add Existing Journal</button>
                <button onClick={onCreateNew} className="popup-button">Create New Journal</button>
            </div>
        </div>
    );
};

export default GroupsAddCreatePopup;
