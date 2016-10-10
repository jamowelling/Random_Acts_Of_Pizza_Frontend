import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';

export default class RedditLogin extends Component {
  redditAuthorization() {
    const cliendId = "djH1sd6Q0amUNw"
    const state = "noahschutte5"
    const uri = "raopscheme://response"
    const scope = "identity"
    // fetch(`https://www.reddit.com/api/v1/authorize.compact?client_id=djH1sd6Q0amUNw&response_type=token&state=noahschutte6&redirect_uri=raopscheme://response&duration=permanent&scope=identity`)
    // .then((response) => {
    //   console.log("response", response);
    //   return response.json()})
    // .then((responseJson) => {
    //   console.log("responseJson", responseJson);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    console.log("press Reddit Login button");
    this.props.navigator.push({ name: 'webViewExample' })
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          text={'Login with Reddit'}
          onPress={this.redditAuthorization.bind(this)}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
})
