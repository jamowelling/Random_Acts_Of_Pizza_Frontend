import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VideoExample from './Video';

export default class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
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
    padding: 22,
    flex: 1,
    alignItems: 'center',
    // borderWidth: 3,
    borderColor: 'blue',
  },
  header: {
    // borderColor: 'green',
    // borderWidth: 2,
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
