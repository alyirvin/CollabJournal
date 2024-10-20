import './loginforgot.css';
import React, {useState} from 'react';
import axios from 'axios';
import { toBeChecked } from '@testing-library/jest-dom/matchers';
const Login = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        // how to validate username and password
        // console.log('UserName:', user);
        // console.log('Email:', email);
        // console.log('Password:', password);
        try {
            await axios.post('http://localhost:5001/Login', { user, email, password })
            .then(res => {
                if(res.data === "Exist") {
                    alert("Success")
                }
                else if(res.data === "Not Found") {
                    alert("failure")
                }
                else {
                    alert("error")
                }
            })
        }
        catch(e) {
            console.log(e);
        }
      };
    return (
        <div>
            <div className = 'container'>
                <div className = 'header'>
                    <div className = "text">Login</div>
                    <div className = "underline"></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label>Username:</label>
                    <input
                        type="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                    </div>
                    <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
        
    )
}
export default Login;