import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VideoExample from './Video';

export default class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View>
          <Text style={styles.total}>
            {this.props.totalDonatedPizzas} pizzas have been donated through:
          </Text>
          <Text style={styles.title}>
            Random Acts of Pizza
          </Text>
        </View>

        <VideoExample {...this.props} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 22,
    backgroundColor: 'white',
    height: 550,
  },
  title: {
    textAlign: 'center',
    color: '#ce0000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  total: {
    textAlign: 'center',
  }
})
