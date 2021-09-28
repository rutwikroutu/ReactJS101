import React, { useState, useEffect } from 'react'
import './ViewDiary.css';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { db } from '../../firebase';
import firebase from 'firebase'
import { useHistory } from 'react-router-dom';
import DeleteIconOutlined from '@material-ui/icons/DeleteOutlined';
import { useAlert } from 'react-alert'

function ViewDiary() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [entry, setEntry] = useState();
    const [email, setEmail] = useState('');
    const history = useHistory()
    const alert = useAlert()

    useEffect(() => {
        if (firebase.auth().currentUser) {
            setEmail(firebase.auth().currentUser.email);
            db.collection('users').doc(firebase.auth().currentUser.email).collection('diaryEntries').doc(id).onSnapshot(doc => {
                if (doc.exists) {
                    setEntry(doc.data());
                } else {
                    history.push("/");
                }
            })
        }
    }, [])

    useEffect(() => {
        if (entry) {
            var password = window.prompt('Please enter the password');
            if (password != entry.password) {
                history.push(`/`);
                alert.show("Incorrect Password", {
                    type: "error"
                })
            } else {
                setLoading(false)
            }
        }
    }, [entry])

    const deleteIcon = () => {
        const resp = window.confirm("Are you sure you want to delete ?");

        if (resp == true && email) {
            setLoading(true);
            db.collection('users').doc(email).collection('diaryEntries').doc(id).delete().then(() => {
                alert.show("Successfully Deleted", {
                    type: "success"
                })
            })
        }
    }

    return !loading ? (
        <div className="viewDiary">
            <Navbar />

            <div className="diary__area">
                <h1>{entry.date.toDate().toDateString().substring(4)} <DeleteIconOutlined onClick={() => deleteIcon()} style={{ color: 'red', marginRight: 10, cursor: 'pointer' }} /></h1>

                <h2>{entry.value}</h2>
            </div>
        </div>
    ) : (
            <div className="home" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <h1 style={{ color: 'white' }}>LOADING...</h1>
            </div>
        )
}

export default ViewDiary
