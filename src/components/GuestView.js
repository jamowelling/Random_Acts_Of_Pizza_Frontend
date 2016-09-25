import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Login from './Login';

export default class GuestView extends Component {
  render() {
    return (
      <View>
        <Nav backButton {...this.props} />
        <View style={styles.container}>
          <Text>
            Random Acts of Pizza
          </Text>
          <Text>
            "The power of kindness, one pizza at a time."
          </Text>
          <Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 22,
    backgroundColor: 'white',
    height: 550,
  },
})
