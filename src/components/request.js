import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Request extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: " ",
      errorMessage: " "
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Successfully create Request show page.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
