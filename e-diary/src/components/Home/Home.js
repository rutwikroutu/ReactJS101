import React, { useEffect, useState } from 'react'
import './Home.css';
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import { auth, db } from '../../firebase';
import firebase from 'firebase'
import moment from 'moment';
import CreateIconOutlined from '@material-ui/icons/CreateOutlined';

function Home() {
    const history = useHistory();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [diaryEntries, setDiaryEntries] = useState([]);

    const addEntry = () => {
        history.push(`/addEntry`)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
                db.collection('users').doc(firebase.auth().currentUser.email).collection('diaryEntries').orderBy('date').onSnapshot(snapshot => {
                    setDiaryEntries(snapshot.docs.map(doc => ({
                        id: doc.id,
                        entry: doc.data(),
                    })));

                })
                setLoading(false);
            } else {
                history.push("/login");
                setLoading(false);
            }
        })

        return unsubscribe;
    }, [])

    return !loading ? (
        <div className="home">
            <Navbar />
            {
                diaryEntries.length == 0 ? (
                    <div style={{ width: '100%', minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button className="create" onClick={() => addEntry()}>
                            <CreateIcon size={24} color="white" style={{ margin: 5, }} />
                            <h1>Create</h1>
                        </button>
                    </div>
                ) : (
                        <>
                            <button className="create" onClick={() => addEntry()}>
                                <CreateIcon size={24} color="white" style={{ margin: 5, }} />
                                <h1>Create</h1>
                            </button>
                            <div className="diaryEntries__container">
                                {
                                    diaryEntries && diaryEntries.map(({ id, entry }) => {
                                        return (
                                            <div className="home__card" onClick={() => history.push(`/viewDiary/${id}`)}>
                                                <h1>{entry.date.toDate().toDateString().substring(4)}</h1>
                                                <CreateIconOutlined style={{ marginLeft: 10, color: 'white', cursor: 'pointer' }} onClick={(e) => {
                                                    e.stopPropagation();
                                                    history.push(`/editEntry/${id}`);
                                                }} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    )
            }
        </div>
    ) : (
            <div className="home" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <h1 style={{ color: 'white' }}>LOADING...</h1>
            </div>
        )
}

export default Home
