// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {uiConfig, auth} from '../../helpers/firebase';

class SignInScreen extends React.Component {
  render() {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
      </div>
    );
  }
} 

export default SignInScreen