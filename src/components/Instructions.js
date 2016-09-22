import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';

export default class Instructions extends Component {
  render() {
    return (
      <View>

        <Nav {...this.props} />

        <View style={styles.container}>
          <Text style={styles.text}>
            Instructions Page.
          </Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    top: 50,
    flex: 1,
  },
  text: {

  },
})
