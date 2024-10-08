import React, {useState} from 'react';
import axios from 'axios';
const Signup = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        // how to validate username and password
        // console.log('UserName:', user);
        // console.log('Email:', email);
        // console.log('Password:', password);
        await axios.post('http://localhost:5001/Signup', { user, email, password });
        // TODO send an email for verification
        alert('User information saved!');
      };
    return (
        <div>
            <div className = 'container'>
                <div className = 'header'>
                    <div className = "text">Sign Up</div>
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

export default Signup;


//TODO JCrypt