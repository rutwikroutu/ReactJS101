import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA3Xih6dCRZX8_FsG6UtuWLAoTcgXz2GkI",
    authDomain: "e-diary-f0f35.firebaseapp.com",
    projectId: "e-diary-f0f35",
    storageBucket: "e-diary-f0f35.appspot.com",
    messagingSenderId: "333477271403",
    appId: "1:333477271403:web:0083bc28235e2570105e2e"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
