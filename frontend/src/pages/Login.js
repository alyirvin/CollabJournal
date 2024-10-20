import React, {useState} from 'react';
import axios from 'axios';

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
                else if(res.data === "UserEmail not found") {
                    alert("Username or Email not found")
                }
                else {
                    alert("Wrong Password")
                }
            })
        }
        catch(e) {
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

export default Login;