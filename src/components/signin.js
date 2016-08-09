import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './FBLogin';
import Button from './button';

export default class Signin extends Component {
  onRequestsPress() {
    this.props.navigator.push({name: 'requests'});
  }
  onProfilePress() {
    this.props.navigator.push({name: 'userProfile'});
  }
  render() {
    let showUserProfileButton;
    let showRequestsButton;

    if (this.props.user) {
      showUserProfileButton = <Button
        text={'User Profile'}
        onPress={this.onProfilePress.bind(this)}
        />
      showRequestsButton = <Button
        text={'Go to Requests'}
        onPress={this.onRequestsPress.bind(this)}
        />
    }
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>
          Random Acts of Pizza
        </Text>


        <Login
          onUserChange={this.props.onUserChange}
          />

        {showRequestsButton}

        {showUserProfileButton}

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
