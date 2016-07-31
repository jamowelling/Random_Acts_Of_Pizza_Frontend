import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './button';

export default class Requests extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Requests Page
        </Text>
        <Button text={'Create Request'} onPress={this.onNewRequestPress} />
      </View>
    );
  }
  onNewRequestPress() {
    // this.props.navigator.push({name: 'new_request'});
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
