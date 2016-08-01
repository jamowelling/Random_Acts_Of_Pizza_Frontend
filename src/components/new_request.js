import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from './button';

export default class NewRequest extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      title: '',
      location: '',
      pizzas: 0,
      errorMessage: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Button text={'Cancel Request'} onPress={this.onCancelRequest} />

        <Text>
          New Request Form
        </Text>

        <Text style={styles.label}>
          Title:
        </Text>
        <TextInput
          style={styles.input}
          />

        <Text style={styles.label}>
          Location:
        </Text>
        <TextInput
          style={styles.input}
          />

        <Text style={styles.label}>
          Pizzas:
        </Text>
        <TextInput
          style={styles.input}
          />

        <Text>
          {this.state.errorMessage}
        </Text>

        <Button text={'Submit Request'} onPress={this.onSubmitRequest} />

      </View>
    );
  }
  onSubmitRequest() {
    if (this.state.title.length < 1) {
      console.log("Test")
      return this.setState({errorMessage: 'Your title must be at least 30 characters.'})
    }
    // Submit new request form
  };
  onCancelRequest() {
    // this.props.navigator.pop();
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
