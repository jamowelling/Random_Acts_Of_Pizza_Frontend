import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './button';

export default class Signin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalDonatedPizzas: null
    }
  }
  componentWillMount() {
    fetch(`http://random-acts-of-pizza.herokuapp.com/users`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({totalDonatedPizzas: responseJson.totalDonatedPizzas})
    })
    .catch((error) => {
      console.error(error);
    });
  }
  onRequestsPress() {
    this.props.navigator.push({name: 'requests'});
  }
  // onProfilePress() {
  //   this.props.navigator.push({name: 'userProfile'});
  // }
  render() {
    let showTotalDonated;
    if (this.state.totalDonatedPizzas) {
      showTotalDonated = <Text>{this.state.totalDonatedPizzas} pizzas have been donated through:</Text>
    }

    let showRequestsButton;
    showRequestsButton = <Button
    text={'Go to Requests'}
    onPress={this.onRequestsPress.bind(this)}
    />

    // let showUserProfileButton;
    // if (this.props.user) {
    //   showUserProfileButton = <Button
    //     text={'Update Email Address'}
    //     onPress={this.onProfilePress.bind(this)}
    //     />
    // }

    return (
      <View style={styles.container}>

        {showTotalDonated}

        <Text style={styles.welcome}>
          Random Acts of Pizza
        </Text>

        {showRequestsButton}

      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
