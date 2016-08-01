import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './FBLogin';
import Button from './button';

export default class Signin extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Random Acts of Pizza
        </Text>
        <Login />
        <Button
          text={'Go to Requests'}
          onPress={this.onRequestsPress.bind(this)}
          />
      </View>
    )
  }
  onRequestsPress() {
    this.props.navigator.immediatelyResetRouteStack([{name: 'requests'}]);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
