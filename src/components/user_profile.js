import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from './button';

export default class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentEmail: 'loading...',
      updatedEmail: ''
    };
    this.onEmailChange = this.onEmailChange.bind(this);
  }
  onEmailChange(updatedEmail) {
    this.setState({updatedEmail})
  }
  onBackPress() {
    this.props.navigator.pop();
  }
  componentDidMount() {
    fetch('http://localhost:3000/users/1')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({currentEmail: responseJson.user.email})
    })
    .catch((error) => {
      console.error(error);
    });
  }
  onUpdateEmailPress() {
    const { updatedEmail } = this.state;
    fetch('http://localhost:3000/users/1', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({updatedEmail})
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      this.setState({currentEmail: responseJson.user.email})
      this.setState({updatedEmail: ''})
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <View style={styles.container}>

        <Button
          text={'Back'}
          onPress={this.onBackPress.bind(this)}
          />

        <Text>
          Current Email:
        </Text>

        <Text>
          {this.state.currentEmail}
        </Text>

        <Text>
          Update Email:
        </Text>

        <TextInput
          onChangeText={this.onEmailChange}
          maxLength = {254}
          autoCorrect={false}
          autoCapitalize = "none"
          value={this.state.updatedEmail}
          style={styles.input}
          />

        <Button
          text={'Update Email'}
          onPress={this.onUpdateEmailPress.bind(this)}
          />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
