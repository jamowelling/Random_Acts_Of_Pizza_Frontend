import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './button';

export default class Requests extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Button
          text={'Logout'}
          onPress={this.onLogoutPress.bind(this)}
          />

        <Button
          text={'Create Request'}
          onPress={this.onNewRequestPress.bind(this)}
          />

        <Text>
          Requests Page
        </Text>

        <Button
          text={'Donate'}
          />

      </View>
    );
  }
  onDonatePress() {
    // patch route
  }
  onNewRequestPress() {
    this.props.navigator.push({name: 'new_request'});
  }
  onLogoutPress() {
    this.props.navigator.immediatelyResetRouteStack([{name: 'signin'}]);
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
