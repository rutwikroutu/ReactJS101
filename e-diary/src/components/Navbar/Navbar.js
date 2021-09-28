import React from 'react'
import './Navbar.css';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAlert } from 'react-alert';

function Navbar() {
    const history = useHistory();
    const alert = useAlert();

    const logout = () => {
        auth.signOut().then(() => {
            history.push("/login");
            alert.show("Logged out", {
                type: "success"
            })
        })
    }

    return (
        <div className="navbar">
            <div className="leftSide">
                <HomeIcon onClick={() => history.push("/")} color="white" size={24} style={{ color: 'white', fontSize: 32, marginLeft: 10, cursor: 'pointer' }} />
            </div>
            <div className-="center">
                <h1>E-DIARY</h1>
            </div>
            <div className="rightSide">
                <ExitToAppIcon onClick={() => logout()} color="white" size={24} style={{ color: 'white', fontSize: 32, marginRight: 10, cursor: 'pointer' }} />
            </div>
        </div>
    )
}

export default Navbar
