import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from './button';

export default class NewRequest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      city: '',
      state: '',
      pizzas: '',
      errorMessage: ''
    };
    this.onTitleChange = this.onTitleChange.bind(this);
  }
  onTitleChange() {
    this.setState({title: "yo"})
  }
  onSubmitRequest() {
    if (this.state.title.length < 15) {
      this.setState({errorMessage: 'Your title must be at least 15 characters.'})
    } else if (this.state.city.length < 2) {
      this.setState({errorMessage: 'What city are you in?'})
    } else if (this.state.state.length < 2) {
      this.setState({errorMessage: 'What state are you in?'})
    } else if (this.state.pizzas.length < 1) {
      this.setState({errorMessage: 'How many pizzas are you requesting?'})
    } else {
      this.setState({errorMessage: ''})
    }
    // Submit new request form
  };
  onCancelRequest() {
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          text={'Cancel Request'}
          onPress={this.onCancelRequest.bind(this)}
          />

        <Text>
          New Request Form
        </Text>

        <Text style={styles.label}>
          Title:
        </Text>
        <TextInput
          maxLength = {50}
          multiline = {true}
          numberOfLines = {4}
          autoCapitalize = "sentences"
          // onChangeText={(title) => this.setState({title})}
          onChangeText={onTitleChange}
          value={this.state.text}
          style={styles.input}
          />

        <Text style={styles.label}>
          City:
        </Text>
        <TextInput
          placeholder = "New York"
          maxLength = {20}
          autoCapitalize = "words"
          onChangeText={(city) => this.setState({city})}
          value={this.state.text}
          style={styles.input}
          />

        <Text style={styles.label}>
          State:
        </Text>
        <TextInput
          placeholder = "NY"
          maxLength = {2}
          autoCapitalize = "characters"
          onChangeText={(state) => this.setState({state})}
          value={this.state.text}
          style={styles.input}
          />

        <Text style={styles.label}>
          Pizzas:
        </Text>
        <TextInput
          placeholder = "1"
          maxLength = {1}
          onChangeText={(pizzas) => this.setState({pizzas})}
          value={this.state.text}
          style={styles.input}
          />

        <Text>
          {this.state.errorMessage}
        </Text>

        <Button text={'Submit Request'} onPress={this.onSubmitRequest.bind(this)} />

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
    fontSize: 20,
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center',
    textAlign: 'center'
  }
});
