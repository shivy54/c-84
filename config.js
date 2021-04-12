import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyD1Lv3UAUbco3Twe4spsMnl7iAjNTg2iCQ",
  authDomain: "booksanta-f6871.firebaseapp.com",
  databaseURL: "https://booksanta-f6871.firebaseio.com",
  projectId: "booksanta-f6871",
  storageBucket: "booksanta-f6871.appspot.com",
  messagingSenderId: "426540209074",
  appId: "1:426540209074:web:3c9438f8ce26e5b5f38aab",
  measurementId: "G-4MJXBYS81F"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
