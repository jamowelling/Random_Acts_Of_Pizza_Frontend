import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Login from './Login';

export default class GuestView extends Component {

  render() {
    let NavBar;
    if (!this.props.excludeNav) {
      NavBar = <Nav backButton {...this.props} />
    }
    return (
      <View style={styles.container}>
        {NavBar}
        <View style={styles.wrapper}>
          <Text style={styles.text}>
            Random Acts of Pizza
          </Text>
          <Text style={styles.text}>
            "The power of kindness, one pizza at a time."
          </Text>
          <Text style={styles.text}>
            Please log in through Facebook:
          </Text>
          <Login
            style={styles.loginButton}
            onUserChange={this.props.onUserChange}
            navigator={this.props.navigator}
            {...this.props}
            />
        </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  text: {
    flex: 1,
    // borderWidth: 1,
  }
})
