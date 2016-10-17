import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import LoginContainer from './LoginContainer';

export default class GuestView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Nav backButton {...this.props} />
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            in knead
          </Text>
          <Text style={styles.text}>
            "The power of kindness, one pizza at a time."
          </Text>
          <Text style={styles.text}>
            Please log in through Facebook:
          </Text>
          <LoginContainer
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
    // borderWidth: 2,
    borderColor: 'red',
  },
  wrapper: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // borderWidth: 2,
  },
  title: {
    marginVertical: 20,
    fontSize: 20,
  },
  text: {
    marginBottom: 30,
  },
})
