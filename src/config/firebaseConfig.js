import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyCRtqTkqJEc3H1R5ba_P4ubpScPYLovCXk",
    authDomain: "wireframes-9092b.firebaseapp.com",
    databaseURL: "https://wireframes-9092b.firebaseio.com",
    projectId: "wireframes-9092b",
    storageBucket: "wireframes-9092b.appspot.com",
    messagingSenderId: "135440563198",
    appId: "1:135440563198:web:fd9b3cb64b249742be9eaf",
    measurementId: "G-SYWEQH6LHQ"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;