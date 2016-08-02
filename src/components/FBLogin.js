import React, { Component } from 'react';
import { View } from 'react-native';
import FBSDK, { AccessToken, LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }
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
                alert("Login was successful with permissions: " + result.grantedPermissions);
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    let accessToken = data.accessToken
                    alert(accessToken.toString())
                    const responseInfoCallback = (error, result) => {
                      if (error) {
                        console.log(error)
                        alert('Error fetching data: ' + error.toString());
                      } else {
                        console.log(result)
                        alert('Success fetching data: ' + result.toString());
                      }
                    }

                    const infoRequest = new GraphRequest(
                      '/me',
                      {
                        accessToken: accessToken,
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
          onLogoutFinished={() => alert("User logged out")}
        />
      </View>
    );
  };
};
