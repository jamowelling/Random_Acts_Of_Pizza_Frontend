import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from './button';
import Login from './FBLogin';

export default class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      updatedEmail: '',
      errorMessage: ' '
    };
    this.onEmailChange = this.onEmailChange.bind(this);
  }
  onEmailChange(updatedEmail) {
    this.setState({updatedEmail})
  }
  onBackPress() {
    this.props.navigator.pop();
  }
  // componentDidMount() {
  //   const userID = this.props.user.id
  //   fetch(`http://localhost:3000/users/${userID}`)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     this.setState({currentEmail: responseJson.email})
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }
  onUpdateEmailPress() {
    const userID = this.props.user.id
    const { updatedEmail } = this.state;
    fetch(`http://localhost:3000/users/${userID}`, {
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
      if (responseJson.email) {
        this.props.onEmailChange(responseJson.email)
        this.setState({updatedEmail: ''})
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.setState({errorMessage: responseJson.errorMessage})
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    console.log(this.props.currentEmail);
    let showFBButton;
    if (true) {
      showFBButton = <Login
        onUserChange={this.props.onUserChange}
        navigator={this.props.navigator}
        />
    }

    return (
      <View style={styles.container}>

        <Button
          text={'Back to Requests'}
          onPress={this.onBackPress.bind(this)}
          />

        {showFBButton}

        <Text>
          Current Email:
        </Text>

        <Text>
          {this.props.currentEmail}
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

        <Text>
          {this.state.errorMessage}
        </Text>

        <Button
          text={'Update Email Address'}
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
