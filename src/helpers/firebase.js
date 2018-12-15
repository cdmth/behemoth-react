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

// export const provider = new firebase.auth.EmailAuthProvider();
export const auth = firebase.auth();

// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};