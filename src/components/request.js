import React, { Component } from 'react';
import { AlertIOS, View, Text, StyleSheet } from 'react-native';
import VideoExample from './Video';
import Login from './Login';
import Button from './Button';

export default class Request extends Component {
  onDonatePress(request) {
    AlertIOS.alert(
      `Are you sure you want to donate ${request.pizzas} pizza(s)?`,
      `You will have 30 minutes to send a gift certificate by email from the ${request.vendor} website.`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Donate',
          onPress: this.onConfirmPress.bind(this, request)
        }
      ]
    )
  }
  onConfirmPress(request) {
    const userID = this.props.user.id;
    fetch(`http://random-acts-of-pizza.herokuapp.com/requests/${request.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({userID})
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      this.props.collectRequests(responseJson.requests)
      this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
    })
    .catch((error) => {
      console.error(error);
    });
    this.props.navigator.push({name: 'instructions'})
  }
  // componentWillMount() {
  //   fetch(`http://localhost:3000/requests/1`)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     if (responseJson.errorMessage === 'No current requests.') {
  //       this.setState({errorMessage: responseJson.errorMessage})
  //     } else {
  //       this.setState({errorMessage: ' '})
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }

  render() {
    let hasDonor;
    let showDonateButton;
    let showLoginDialog;
    let request = this.props.request;

    if (this.props.user === null) {
      showLoginDialog = <Login {...this.props} />
    }
    if (request.donor_id) {
      hasDonor = <Text>DONATION RECEIVED!</Text>
    } else if (this.props.user === null) {
      // not logged in
      // no donate button
    } else if (this.props.user.id === this.creator_id) {
      // is not donated
      // no donate button
    } else {
      showDonateButton = <Button text={'Donate'} onPress={this.onDonatePress.bind(this, request)}/>
    }
    return (
      <View style={styles.request}>
        {hasDonor}
        <VideoExample />
        <Text style={styles.text}>
          {request.first_name} - {request.pizzas} pizza(s) - {request.vendor}
        </Text>
        <Text style={styles.text}>
          {request.title}
        </Text>
        {showDonateButton}
        {showLoginDialog}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  request: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#ce0000',
    fontSize: 25,
    fontWeight: 'bold',
  }
})
