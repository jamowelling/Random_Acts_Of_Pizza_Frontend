import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from './button';

export default class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ''
    };
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
          Email:
        </Text>
        <TextInput
        onChangeText={(email) => this.setState({email})}
        value={this.state.text}
        style={styles.input}
          />

        <Button
          text={'Update email'}
          />

      </View>
    )
  }
  onBackPress() {
    this.props.navigator.pop();
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
