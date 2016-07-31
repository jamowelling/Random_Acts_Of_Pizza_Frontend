import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from './button';

export default class NewRequest extends Component {
  getInitialState() {
    return {
      title: '',
      location: '',
      pizzas: 0
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          New Request Form
        </Text>

        <Text style={styles.label}>
          Title:
        </Text>
        <TextInput
          style={styles.input}
          />

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  }
});
