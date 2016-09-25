import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Button from './Button';
import Login from './Login';
import Nav from './Nav';

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
  onUpdateEmailPress() {
    const userID = this.props.user.id
    const { updatedEmail } = this.state;
    fetch(`http://random-acts-of-pizza.herokuapp.com/users/${userID}`, {
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
    return (
      <View>
        <Nav backButton {...this.props} />
        <View style={styles.container}>

          <View style={styles.instructionsContainer}>
            <Text style={styles.instructions}>
              Make sure your email is updated below. If you make a request, a donor will send a gift card to the email address that is listed below.
            </Text>
          </View>

          <View style={styles.currentEmail}>
            <Text style={styles.title}>
              Current Email:
            </Text>

            <Text style={styles.email}>
              {this.props.currentEmail}
            </Text>
          </View>

          <View style={styles.updateEmail}>
            <Text style={styles.title}>
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

          </View>

          <View style={styles.errorContainer}>
            <Text style={styles.error}>
              {this.state.errorMessage}
            </Text>
          </View>

          <View style={styles.updatedEmailButtonContainer}>
            <Button
              style={styles.updatedEmailButton}
              text={'Submit'}
              onPress={this.onUpdateEmailPress.bind(this)}
              />
          </View>

          <Login
            style={styles.loginButton}
            onUserChange={this.props.onUserChange}
            navigator={this.props.navigator}
            />

        </View>
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
  instructionsContainer: {
    width: 250,
  },
  instructions: {
    textAlign: 'center',
  },
  input: {
    fontSize: 15,
    padding: 4,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 250,
    alignSelf: 'center',
    textAlign: 'center'
  },
  currentEmail: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
  updateEmail: {
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  updatedEmailButtonContainer: {
    marginBottom: 50,
  },
  updatedEmailButton: {

  },
  email: {
    textAlign: 'center',
    marginTop: 5,
  },
  errorContainer: {
    height: 40,
  },
  error: {
    textAlign: 'center',
    color: '#ce0000',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  loginButton: {
  },
});
