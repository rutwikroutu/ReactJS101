import React, { useState } from 'react'
import './Register.css';
import { auth, db } from '../../../firebase';
import { useHistory, Link } from 'react-router-dom';
import { useAlert } from 'react-alert'

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const alert = useAlert()

    const login = () => {
        setLoading(true);
        auth.createUserWithEmailAndPassword(email, password).then(authUser => {
            db.collection('users').doc(email).set({
                email,
                fullName,
            });
            setPassword("");
            setLoading(false);
            setEmail("")
            history.push("/");
        }).catch(err => {
            alert.show(err, {
                type: "error"
            })
            setPassword("");
            setEmail("")
        })
    }

    return (
        <div className="login">
            <div className="login__form">
                <h1>REGISTER</h1>
                <input placeholder="Enter your full name" className="login__input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <input placeholder="Enter your email" className="login__input" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Enter your password" type="password" className="login__input" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="login__submit" onClick={() => login()}>{loading ? "LOADING..." : "SUBMIT"}</button>
                <Link to="/login" style={{ textDecoration: 'none', margin: 25 }}><p style={{ color: 'white', textAlign: 'center' }}>Already have an account ? Login</p></Link>
            </div>
        </div>
    )
}

export default Register
