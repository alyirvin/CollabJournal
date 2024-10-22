import React, { useState } from 'react';
import axios from 'axios';
import './reset.css';
import spirals from './images/spirals.png';

const Reset = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5001/ResetPassword', { email, newPassword });
            setMessage(response.data);
            // Redirect to login page after successful password reset
            window.location.href = '/Login';
        } catch (error) {
            setMessage(error.response.data);
        }
    };

    return (
        <div className="resetContainer">
            <div className="containerSpiral">
                <img src={spirals} alt="spirals" id="spirals" />
            </div>
            <p className="title">RESET PASSWORD</p>
            <form onSubmit={handleSubmit}>
                <div className="containerOne">
                    <label className="textTwo">Email</label>
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="textTwo">New Password</label>
                    <input
                        className="input"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <label className="textTwo">Confirm New Password</label>
                    <input
                        className="input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="button" type="submit">
                    <div id="button-text">RESET PASSWORD</div>
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Reset;