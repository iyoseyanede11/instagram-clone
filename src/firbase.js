import firebase from "firebase"
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD--pQwUEbxhBW1I6tFIKy0pWLOChEdg2g",
    authDomain: "instagram-react-clone-d48dd.firebaseapp.com",
    databaseURL: "https://instagram-react-clone-d48dd.firebaseio.com",
    projectId: "instagram-react-clone-d48dd",
    storageBucket: "instagram-react-clone-d48dd.appspot.com",
    messagingSenderId: "827002473755",
    appId: "1:827002473755:web:2932ef0600c3d5b9bc17be",
    measurementId: "G-XBZEJ7QKLW"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export{db, auth, storage}