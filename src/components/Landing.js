import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Landing extends Component {
  render() {
    return (
      <View style={styles.request}>
        <Text>
          {this.props.totalDonatedPizzas} pizzas have been donated through:
        </Text>
        <Text style={styles.text}>
          Random Acts of Pizza
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  request: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#ce0000',
    fontSize: 25,
    fontWeight: 'bold',
  }
})
