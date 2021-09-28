import React, { useEffect, useState } from 'react'
import './EditEntry.css';
import Navbar from '../Navbar/Navbar';
import { db } from '../../firebase';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import firebase from 'firebase';
import { useAlert } from 'react-alert'

function EditEntry() {
    const [value, setValue] = useState('');
    const history = useHistory();
    const { id } = useParams();
    const alert = useAlert()

    useEffect(() => {
        if (firebase.auth().currentUser) {
            db.collection('users').doc(firebase.auth().currentUser.email).collection('diaryEntries').doc(id).onSnapshot(doc => {
                if (doc.exists) {
                    setValue(doc.data().value)
                }
            })
        }
    }, [])

    const editEntry = (e) => {
        e.preventDefault();
        if (value) {
            db.collection('users').doc(firebase.auth().currentUser.email).collection('diaryEntries').doc(id).update({
                value,
            }).then(doc => {
                alert.show("Updated Successfully", {
                    type: "success"
                })
                history.push("/");
            })
        } else {
            alert.show("All fields are required", {
                type: "error"
            })
        }
    }

    return (
        <div className="addEntry">
            <Navbar />
            <h1>Edit Entry</h1>

            <textarea placeholder="Enter your diary entry ...." value={value} onChange={(e) => setValue(e.target.value)} />

            <button type="submit" className="addEntry__button" onClick={(e) => editEntry(e)}>Submit</button>
        </div>
    )
}

export default EditEntry
