import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDbDMwXlY4J1rix1cF7I7dg1V2cokpQo7k",
  authDomain: "self-designed-game-1-383aa.firebaseapp.com",
  databaseURL: "https://self-designed-game-1-383aa-default-rtdb.firebaseio.com",
  projectId: "self-designed-game-1-383aa",
  storageBucket: "self-designed-game-1-383aa.appspot.com",
  messagingSenderId: "966283885481",
  appId: "1:966283885481:web:48ff6cde8e039d74c022b8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
