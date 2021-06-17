import firebase from 'firebase';

import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDEZEDG_vhuBkvnI2h8as436BEPL-Plnq4",
    authDomain: "newsapi-15765.firebaseapp.com",
    projectId: "newsapi-15765",
    storageBucket: "newsapi-15765.appspot.com",
    messagingSenderId: "189639315557",
    appId: "1:189639315557:web:67f3b9ec3c4b604bbfb68c",
    measurementId: "G-BDPES6PKDF"
};

let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
export const auth = firebase.auth();

export default {firebase, db, auth};
