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

    return(
      <div className="resetContainer">
        <div className="containerSpiral">
          <img src={spirals} alt="spirals" id="spirals"/>
        </div>
        <p className="title">RESET PASSWORD</p>
        <div className="containerOne">
          <label className="textTwo">New Password</label>
          <input className="input" />
          <p />
          <label className="textTwo">Confirm New Password</label>
          <input className="input" />
        </div>
        <p />
        <button className="button">
          <a className="button-prop" href="login.html">
            <div id="button-text">LOG IN</div>
          </a>
        </button>
      </div>
    )
}

export default Reset