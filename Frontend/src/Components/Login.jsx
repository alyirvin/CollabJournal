import './login.css';
import React, { useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import spiralBind from './images/spirals.png';
import background from './images/background.png';
import { toBeChecked } from '@testing-library/jest-dom/matchers';
=======
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

>>>>>>> a22c3081841ad5590df29e649e4a2195faeb40e1
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
        <div class = "loginContainer">
            <div class = 'spiraled'>
                <div class = "biggerpage">
                    <div class = "section">
                        <div class = "title">
                            LOG IN
                        </div>
                            <form onSubmit={handleSubmit}>
                            <div class = 'type'>
                                <label>Username:</label>
                                <input class = "enter"
                                    type="user"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                />
                            </div>
                            <div class = 'type'>
                                <label>Email:</label>
                                <input class = "enter"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div class = 'type1'>
                            <label>Password:</label>
                            <input class = "enter"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <a src = "reset.jsx">&nbsp;Forgot Password?</a>
                            </div>
                            <div class = 'type'>
                            <button class = "button" type="submit">Login</button>
                            </div>
                            </form>
                    </div>
                    <div class = "section2">
                        <div class = "or">
                            OR
                        </div>
                        <div class = "continue">
                            <button class="button">
                                CONTINUE WITH GOOGLE
                            </button>
                            <button class="button">
                                CONTINUE WITH FACEBOOK
                            </button>
                        </div>
                    </div>
                </div>
                <img src={spiralBind} class = 'spirals'></img>
            </div>
        </div>
    )
}
export default Login;
