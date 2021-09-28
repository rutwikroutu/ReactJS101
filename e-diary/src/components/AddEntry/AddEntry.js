import React, { useEffect, useState } from 'react'
import './AddEntry.css';
import Navbar from '../Navbar/Navbar';
import { db } from '../../firebase';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import firebase from 'firebase';
import { useAlert } from 'react-alert'

function AddEntry() {
    const [password, setPassword] = useState('');
    const [value, setValue] = useState('');
    const timestamp = firebase.firestore.FieldValue.serverTimestamp;
    const history = useHistory();
    const alert = useAlert()

    useEffect(() => {
        var password = window.prompt('Please enter your desired password');

        if (password == null) {
            history.push("/");
            return;
        }

        setPassword(password);
    }, [])

    const addEntry = () => {
        if (password && value) {
            db.collection('users').doc(firebase.auth().currentUser.email).collection('diaryEntries').add({
                value,
                password,
                date: timestamp()
            }).then(doc => {
                history.push(`/viewDiary/${doc.id}`)
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
            <h1>Add Entry</h1>

            <textarea placeholder="Enter your diary entry ...." onChange={(e) => setValue(e.target.value)} />

            <button type="submit" className="addEntry__button" onClick={() => addEntry()}>Submit</button>
        </div>
    )
}

export default AddEntry
