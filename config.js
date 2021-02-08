import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyCv3kcOY6WKUp0X2xdWwW78GJxpmdxCBGc",
    authDomain: "booksantaclass.firebaseapp.com",
    projectId: "booksantaclass",
    storageBucket: "booksantaclass.appspot.com",
    messagingSenderId: "841824557965",
    appId: "1:841824557965:web:4193eb1c727c4ff52efbc4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()