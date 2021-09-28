import React, { useState } from 'react';
import './Register.css';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const register = () => {
        if (!email || !password) {
            alert("All fields are required");
            return;
        }

        auth.createUserWithEmailAndPassword(email, password).then(authUser => {
            db.collection("users").doc(email).set({
                name,
                email,
                like: false,
            });

            history.push("/");
        })
    }

    return (
        <div className="login">
            <h1>Register</h1>
            <input className="input" value={name} placeholder="Enter your full name" onChange={(e) => setName(e.target.value)} />
            <input className="input" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} className="input" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" onClick={() => register()}>Register</button>
        </div>
    )
}

export default Register
