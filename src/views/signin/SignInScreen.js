// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAkpJiNiJ8PX18ETSBfiidnA_FZIKXazbU",
  authDomain: "behemoth-1f3a5.firebaseapp.com",
  databaseURL: "https://behemoth-1f3a5.firebaseio.com",
  projectId: "behemoth-1f3a5",
  storageBucket: "behemoth-1f3a5.appspot.com",
  messagingSenderId: "1023358943709"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      console.log('bää')
      localStorage.setItem('firebase-token', idToken)
    }).catch(function(error) {
      // Handle error
    });

  } else {
    // console.log('user signed-out');
    localStorage.setItem('firebase-token', null)
  }
}, function(error) {
  console.log(error);
  // console.log(document.cookie);
});

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

class SignInScreen extends React.Component {
  render() {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
} 

export default SignInScreen