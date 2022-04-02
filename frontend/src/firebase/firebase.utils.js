import firebase from 'firebase';
// import 'firebase/firestore';
// import 'firebase/auth';

const config={
    apiKey: "AIzaSyCQheqsXLBmBILcpWJcXXBp_aJWEl2CD9w",
    authDomain: "contrace-7f395.firebaseapp.com",
    projectId: "contrace-7f395",
    storageBucket: "contrace-7f395.appspot.com",
    messagingSenderId: "70036075145",
    appId: "1:70036075145:web:a5bc676e86bf54af2c8c58",
    measurementId: "G-729Y810E88"
  };

  firebase.initializeApp(config);

//   export const auth = firebase.auth();
//   export const firestore = firebase.firestore();

//   const provider = new firebase.auth.GoogleAuthProvider();
//   provider.setCustomParameters({prompt: 'select_account'});
//   export const signInWithGOogle =() => auth.signInWithPopup(provider);

  export {firebase}; 

  
