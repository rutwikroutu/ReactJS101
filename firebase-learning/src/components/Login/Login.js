import React, { useState } from 'react';
import './Login.css';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const login = () => {
        if (!email || !password) {
            alert("All fields are required");
            return;
        }

        auth.signInWithEmailAndPassword(email, password).then(authUser => {
            history.push("/");
        })
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input className="input" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} className="input" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" onClick={() => login()}>Login</button>
        </div>
    )
}

export default Login
