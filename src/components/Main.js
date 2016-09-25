import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Nav from './Nav';
import Requests from './Requests';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Nav {...this.props} />

        <Requests {...this.props} />

      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
