import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './Login';
import RedditLogin from './RedditLogin';

export default class LoginContainer extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Login
          onUserChange={this.props.onUserChange}
          navigator={this.props.navigator}
          {...this.props}
          />
        <RedditLogin
          onUserChange={this.props.onUserChange}
          navigator={this.props.navigator}
          {...this.props}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
})
