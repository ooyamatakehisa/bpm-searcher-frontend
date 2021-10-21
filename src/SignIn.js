import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyAmi32aEPLYTvsGmgT5DWxGHJGhs19KBhY",
  authDomain: "bpm-searcher.firebaseapp.com",
  projectId: "bpm-searcher",
  storageBucket: "bpm-searcher.appspot.com",
  messagingSenderId: "380948537710",
  appId: "1:380948537710:web:37f78017daaee0abe3617f",
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  // signInFlow: 'redirect',
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

export default function SignIn() {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
