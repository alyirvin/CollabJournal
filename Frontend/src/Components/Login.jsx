import './login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/Login', { user, email, password })
                .then(res => {
                    if (res.data.status === "Exist") {
                        localStorage.setItem('userId', res.data.userId); // Store userId in localStorage
                        alert("Success");
                        window.location.href = '/Groups'; // Redirect to Groups page
                        console.log(res.data.userId)
                    } else if(res.data === "UserEmail not found") {
                        alert("Username or Email not found")
                    }
                    else {
                        alert("Wrong Password")
                    }
                });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="loginContainer">
            <div className="biggerpage">
                <div className="section">
                    <div className="type">
                        LOG IN
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="type">
                            <label>Username:</label>
                            <input className="enter"
                                type="user"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                required
                            />
                        </div>
                        <div className="type">
                            <label>Email:</label>
                            <input className="enter"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="type">
                            <label>Password:</label>
                            <input className="enter"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className="button" type="submit">Login</button>
                        <button className="button">
                            <Link className="button-prop" to="/Forgot">
                                <div id="button-text">Forgot Password</div>
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
