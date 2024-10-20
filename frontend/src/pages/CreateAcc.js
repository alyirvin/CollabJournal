import React, { useState } from 'react';
import './loginforgot.css';
import axios from 'axios';
const CreateAcc = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/Signup', { user, email, password })
            .then(res =>  {
                if(res.data === "User added successfully") {
                    alert("Success")
                }
                else if(res.data === "Hashing failed") {
                    alert("Hashing failed")
                }
                else {
                    alert("error");
                }
            })
        } catch(e) {
            console.log(e);
        }
      };
    return (
        <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Document Title</title>
        <link rel="stylesheet" href="loginforgot.css" /> 
        <link href="https://fonts.googleapis.com/css?family=Krona One" rel="stylesheet" />
        <main>
            <div className="page">
                <div className="section">
                    <div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="type">
                            <label>Username:</label>
                            <input
                                class="enter"
                                type="user"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                required
                            />
                        </div>
                        <div className="type">
                        <label>Email:</label>
                        <input
                            class="enter"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        </div>
                        <div className="type">
                        <label>Password:</label>
                        <input
                            class="enter"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        </div>
                        <button className="button">Submit</button>
                    </form>
                </div>
            </div>
        </main>
        </div>
    );
};
export default CreateAcc;
