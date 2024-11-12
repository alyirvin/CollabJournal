import './signup.css';
import React, {useState} from 'react';
import axios from 'axios';
import spiralBind from './images/spirals.png';
const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password does not match')
            return;
        }
        await axios.post('http://localhost:5001/Signup1', {username, email, password })
            .then(res => {
                if(res.data === "User already exists") {
                    alert("User already exists, please refresh the page")
                }
                else alert(`Welcome ${firstName} ${lastName}!`)
            })
        await axios.post('http://localhost:5001/Signup2', {firstName, lastName, username, email, password })
            .then(res => {
                if(res.data === "User already exists") {
                    alert("User already exists, please refresh the page")
                }
                else if(res.data === "User added successfully") {
                    alert("User information saved, your password has been hashed")
                }
                else if(res.data === "Hashing failed") {
                    alert("Something went wrong :( please refresh the page")
                }
                else {
                    alert("Something went wrong :( please refresh the page")
                }
            })
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
                                    type = "user"
                                    value = {firstName}
                                    onChange = {(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div class = 'type'>
                                <label>Username:</label>
                                <input
                                    class = 'enter'
                                    type="user"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                                    value = {lastName}
                                    onChange = {(e) => setLastName(e.target.value)}
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
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
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


