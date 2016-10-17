import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VideoExample from './Video';

export default class Landing extends Component {
  render() {
    let noRequests;
    if (this.props.noRequests) {
      noRequests =
        <View style={styles.noRequestsContainer}>
          <Text style={styles.noRequests}>
            There are no current requests. Please come back later or submit a request of your own.
          </Text>
        </View>
    }
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.total}>
            {this.props.totalDonatedPizzas} pizzas have been donated through:
          </Text>
          <Text style={styles.title}>
            in knead
          </Text>
        </View>

        <VideoExample {...this.props} />

        {noRequests}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    padding: 22,
    alignItems: 'center',
    // borderWidth: 3,
    // borderColor: 'blue',
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
  },
  noRequestsContainer: {
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
    borderColor: 'green',
    backgroundColor: 'green',
  },
  noRequests: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    // borderWidth: 3,
  },
})
