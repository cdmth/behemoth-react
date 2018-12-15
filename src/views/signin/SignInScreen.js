// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {uiConfig, auth} from '../../helpers/firebase';
import { Redirect } from "react-router-dom";


class SignInScreen extends React.Component {
  render() {
    if(this.props.user) { 
      return <Redirect to="/" /> 
    }

    return (
      <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
      </div>
    );
  }
} 

export default SignInScreen