import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDSdURPKaIl_fUIep9I6t61Ckkhg6lYcIY",
    authDomain: "fir-learning-fcb7e.firebaseapp.com",
    projectId: "fir-learning-fcb7e",
    storageBucket: "fir-learning-fcb7e.appspot.com",
    messagingSenderId: "14373162449",
    appId: "1:14373162449:web:f8d9e94520f79f745b24f0",
    measurementId: "G-MWB9XT0JT3"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
