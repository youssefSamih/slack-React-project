import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

require('dotenv').config();

var firebaseConfig = {
  apiKey: "AIzaSyAnLAHKZwyCRO3P38KcSvvVFFQU99f-WnY",
  authDomain: "slack-react-7acec.firebaseapp.com",
  databaseURL: "https://slack-react-7acec.firebaseio.com",
  projectId: "slack-react-7acec",
  storageBucket: "slack-react-7acec.appspot.com",
  messagingSenderId: "439902323191",
  appId: "1:439902323191:web:65f6dcf7385b99a8ebeef2"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;