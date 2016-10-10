import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';

export default class WebViewExample extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      status: '',
    }
  }
  onLoadStart() {
    console.log("this", this);
  }
  fetchReddit() {
    const clientId = "djH1sd6Q0amUNw"
    const responseType ="code"
    const state = "noahschutte10"
    const redirectUri = "http://www.google.com"
    const duration = "permanent"
    const scope = "identity"
    const real = `https://www.reddit.com/api/v1/authorize.compact?client_id=${clientId}&response_type=${responseType}&state=${state}&redirect_uri=${redirectUri}&duration={duration}&duration=${duration}&scope=${scope}`
    fetch(real)
    .then((response) => {
      console.log("response", response);
      return response.json()})
    .then((responseJson) => {
      console.log("responseJson", responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  onNavigationStateChange = (navState) => {
    console.log("navState", navState);
    if (navState.title) {
      this.setState({status: navState.title})
    } else {
      this.setState({status: ''})
    }
    if (navState.url) {
      this.setState({url: navState.url})
    } else {
      this.setState({url: ''})
    }
    // this.setState({
    //   url: navState.url,
    //   status: navState.title,
    // });
    console.log("state", this.state);
  };
  render() {

    const uri = "https://www.reddit.com/api/v1/authorize.compact?client_id=djH1sd6Q0amUNw&response_type=token&state=noahschutte11&redirect_uri=http://www.google.com&duration=permanent&scope=identity"

    const clientId = "djH1sd6Q0amUNw"
    const responseType ="code"
    const state = "noahschutte10"
    const redirectUri = "http://www.google.com"
    const duration = "permanent"
    const scope = "identity"
    const real = `https://www.reddit.com/api/v1/authorize.compact?client_id=${clientId}&response_type=${responseType}&state=${state}&redirect_uri=${redirectUri}&duration={duration}&duration=${duration}&scope=${scope}`
    // https://www.reddit.com/api/v1/access_token

    return (
      <View style={styles.container}>
        <WebView
          onNavigationStateChange={this.onNavigationStateChange}
          source={{ uri: real }}
          style={{marginTop: 20}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
