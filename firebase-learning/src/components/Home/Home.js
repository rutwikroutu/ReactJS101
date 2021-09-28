import React, { useState, useEffect } from 'react';
import './Home.css';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Home() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((authUser) => {
            if (!authUser) {
                history.push("/login");
            } else {
                console.log(authUser);
                db.collection('users').doc(authUser.email).onSnapshot((doc) => {
                    setUser(doc.data());
                    setLoading(false);
                })
            }
        })

        return unsubcribe;
    }, [history])

    const like = () => {
        if (user.like == true) {
            db.collection('users').doc(user.email).update({
                like: false,
            })
        } else {
            db.collection('users').doc(user.email).update({
                like: true,
            })
        }
    }

    const logout = () => {
        auth.signOut().then(() => {
            history.push("/login");
        })
    }

    const deleteUser = () => {
        auth.signOut().then(() => {
            db.collection('users').doc(user.email).delete().then(() => {
                history.push("/login")
            })
        })

    }

    return !loading && (
        <div className="home">
            <h1>Welcome {user?.name} <DeleteOutlineIcon style={{ fontSize: 35 }} onClick={() => deleteUser()} /> <ExitToAppIcon style={{ fontSize: 35 }} onClick={() => logout()} /></h1>
            <div className="likeDiv">
                {
                    user?.like == false ? (
                        <FavoriteBorderIcon style={{ fontSize: 40, margin: 20, cursor: 'pointer' }} onClick={() => like()} />
                    ) : (
                            <FavoriteIcon style={{ fontSize: 40, margin: 20, cursor: 'pointer' }} onClick={() => like()} />
                        )
                }
            </div>
        </div>
    )
}

export default Home
