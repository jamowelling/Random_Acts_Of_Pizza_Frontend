import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './FBLogin';
import Button from './button';

export default class Signin extends Component {
  onRequestsPress() {
    this.props.navigator.immediatelyResetRouteStack([{name: 'requests'}]);
  }
  onProfilePress() {
    this.props.navigator.push({name: 'userProfile'});
  }
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>
          Random Acts of Pizza
        </Text>

        <Login />

        <Button
          text={'User Profile'}
          onPress={this.onProfilePress.bind(this)}
          />

        <Button
          text={'Go to Requests'}
          onPress={this.onRequestsPress.bind(this)}
          />

      </View>
    )
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
  }
});
