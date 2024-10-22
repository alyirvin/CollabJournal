import React, { useState } from 'react';
import axios from 'axios';
import './forgot.css';
import spirals from './images/spirals.png';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/ForgotPassword', { email });
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response.data);
        }
    };

    return (
        <div className="forgotContainer">
            <div className="containerSpiral">
                <img src={spirals} alt="spirals" id="spirals" />
            </div>
            <p className="title">FORGOT PASSWORD</p>
            <label className="textOne">
                We'll send you a link to the email address you registered with.
            </label>
            <div className="containerOne">
                <label className="textTwo">Email</label>
                <input
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button className="button" onClick={handleSubmit}>
                <div id="button-text">SEND EMAIL</div>
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Forgot;
