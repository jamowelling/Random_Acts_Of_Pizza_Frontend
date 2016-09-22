import React, { Component } from 'react';
import { View } from 'react-native';
import FBSDK, { AccessToken, LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class Login extends Component {
  createSession(userInfo) {
    fetch('http://localhost:3000/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({userInfo})
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      this.props.onUserChange(responseJson.user)
      this.props.onEmailChange(responseJson.email)
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["email", "public_profile"]}
          onLogoutFinished={
            (error, result) => {
              if (error) {
                alert("Logout failed with error: " + result.error);
              } else {
                this.props.onUserChange(null)
                this.props.navigator.pop();
              }
            }
          }
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const accessToken = data.accessToken
                    const responseInfoCallback = (error, result) => {
                      if (error) {
                        alert('Error fetching data: ' + error.toString());
                      } else {
                        this.createSession(result)
                      }
                    }
                    const infoRequest = new GraphRequest(
                      '/me',
                      {
                        accessToken,
                        parameters: {
                          fields: {
                            string: 'email,name,first_name,middle_name,last_name'
                          }
                        }
                      },
                      responseInfoCallback
                    );
                    new GraphRequestManager().addRequest(infoRequest).start()
                  }
                )
              }
            }
          }
        />
      </View>
    );
  };
};
