import './signup.css';
import React, {useState} from 'react';
import axios from 'axios';
import spiralBind from './images/spirals.png';
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
        <div class = "signupContainer">
            <div class = 'spiraled'>
            <form onSubmit={handleSubmit}>
                <div class = 'biggerpage'>
                    <div class = 'bigsection'>
                        <div class = 'section'>
                            <div class = "title">
                                CREATE ACCOUNT
                            </div>
                            <div class = 'type'>
                                <label>First Name:</label>
                                <input
                                    class = 'enter'
                                />
                            </div>
                            <div class = 'type'>
                                <label>Username:</label>
                                <input
                                    class = 'enter'
                                    type="user"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                />
                            </div>
                            <div class = 'type'>
                                <label>Password:</label>
                                <input
                                    class = 'enter'
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className = 'section'>
                            <div class = "title">
                
                            </div>
                            <div class = 'type'>
                                <label>Last Name:</label>
                                <input
                                    class = 'enter'
                                    type="user"
                                />
                            </div>
                            <div class = 'type'>
                                <label>Email:</label>
                                <input
                                    class = 'enter'
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div class = 'type'>
                                <label>Confirm Password</label>
                                <input
                                    class = 'enter'
                                    type="user"
                                />
                            </div>
                        </div>
                        </div>
                    <div class = 'createacct'>
                        <button class = 'button' type="submit">Login</button>
                    </div>
                </div>
                <img src={spiralBind} class = 'spirals'></img>
                </form>
            </div>
        </div>
    )
}

export default Signup;


//TODO JCrypt