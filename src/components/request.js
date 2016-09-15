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
  componentWillMount() {
    fetch(`http://random-acts-of-pizza.herokuapp.com/requests/1`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage === 'No current requests.') {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.setState({errorMessage: ' '})
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Successfully create Request show page.
        </Text>
        <Text>
          {this.state.errorMessage}
        </Text>
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
