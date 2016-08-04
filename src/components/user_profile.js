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
    // Update email address
    fetch('http://localhost:3000/users/1', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.user.email);
      this.setState({currentEmail: responseJson.user.email})
      // this.setState({currentEmail: 'updated'})
    })
    .catch((error) => {
      console.error(error);
    });
    // console.log(responseJson.user.email);
    console.log(this.state.currentEmail);
    console.log(this.state.updatedEmail);
  }
  render() {
    return (
      <View style={styles.container}>

        <Button
          text={'Back'}
          onPress={this.onBackPress.bind(this)}
          />

        <Text>
          User Profile
        </Text>

        <Text>
          {this.state.currentEmail}
        </Text>

        <Text>
          Email:
        </Text>

        <TextInput
          onChangeText={(updatedEmail) => this.setState({updatedEmail})}
          autoCapitalize = "none"
          value={this.state.text}
          style={styles.input}
          />

        <Button
          text={'Update email'}
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
