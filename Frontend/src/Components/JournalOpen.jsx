import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './journalOpen.css';
import axios from 'axios';

const JournalOpen = () => {
    return (
        <div className="journalOpenContainer"> 
            <HTMLFlipBook width={400} height={500} initPage={1} showCover={true}>
                <div className="page cover-page" data-density="hard">
                    <div className="page-content">Cover Page</div>
                </div>
                <div className="page page1" data-density="hard">
                    <div className="page-content">Page 1</div>
                </div>
                <div className="page page2">
                    <div className="page-content">Page 2</div>
                </div>
                <div className="page page3">
                    <div className="page-content">Page 3</div>
                </div>
                <div className="page page4">
                    <div className="page-content">Page 4</div>
                </div>
            </HTMLFlipBook>
        </div>
    );
};

export default JournalOpen;