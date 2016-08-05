import React, { Component } from 'react';
import { View } from 'react-native';
import FBSDK, { AccessToken, LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null
    }
  }
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
      this.setState({currentUser: responseJson})
      console.log(this.state.currentUser);
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
                        // Call to back end with results
                        // immediatelyResetRouteStack
                        // this.props.navigator.immediatelyResetRouteStack([{name: 'requests'}]);
                        // user={this.state.currentUser}
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
          // onLogoutFinished={
            // this.props.navigator.immediatelyResetRouteStack([{name: 'requests'}]);
          // }
        />
      </View>
    );
  };
};
