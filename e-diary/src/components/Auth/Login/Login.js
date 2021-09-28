import React, { useState } from 'react'
import './Login.css';
import { auth } from '../../../firebase';
import { useHistory, Link } from 'react-router-dom';
import { useAlert } from 'react-alert'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const alert = useAlert()

    const login = () => {
        setLoading(true);
        auth.signInWithEmailAndPassword(email, password).then(authUser => {
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
                <h1>LOGIN</h1>
                <input placeholder="Enter your email" className="login__input" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Enter your password" type="password" className="login__input" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="login__submit" onClick={() => login()}>{loading ? "LOADING..." : "SUBMIT"}</button>
                <Link to="/register" style={{ textDecoration: 'none', margin: 25 }}><p style={{ color: 'white', textAlign: 'center' }}>Don't have an account ? Register</p></Link>
            </div>
        </div>
    )
}

export default Login
