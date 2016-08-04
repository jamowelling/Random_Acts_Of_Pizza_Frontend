import React, { Component } from 'react';
import { View } from 'react-native';
import FBSDK, { AccessToken, LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class Login extends Component {
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["email", "public_profile"]}
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
                        console.log(result)
                        // Call to back end with results
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
                // immediatelyResetRouteStack
                // this.props.navigator.immediatelyResetRouteStack([{name: 'requests'}]);
              }
            }
          }
        />
      </View>
    );
  };
};
