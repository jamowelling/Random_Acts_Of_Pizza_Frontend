import React, { Component } from 'react';
import { AlertIOS, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
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
      hasDonor =
        <Image
          style={styles.received}
          source={require('../../assets/received.png')}
          />
      showDonateButton =
        <Image
          style={styles.donateButton}
          source={require('../../assets/donate.png')}
          />
    } else if (this.props.user === null) {
      // not logged in
      // no donate button
    } else if (this.props.user.id === this.creator_id) {
      // is not donated
      // no donate button
    } else {
      showDonateButton =
        <TouchableOpacity onPress={this.onDonatePress.bind(this, request)} >
          <Image
            style={styles.donateButton}
            source={require('../../assets/donate.png')}
            />
        </TouchableOpacity>
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.firstName}>
            {request.first_name}
          </Text>
          <Text style={styles.dateTime}>
            25 minutes ago
          </Text>
        </View>

        <VideoExample {...this.props} />
        
        <Text style={styles.request}>
          {request.pizzas} pizza(s) from {request.vendor}
        </Text>
        {hasDonor}
        {showDonateButton}
        {showLoginDialog}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 22,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'blue',
  },
  firstName: {
    textAlign: 'center',
    color: '#ce0000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  dateTime: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  request: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  donateButton: {
    width: 200,
    height: 100,
  },
  received: {
    position: 'absolute',
    zIndex: 1,
    width: 150,
    height: 150,
    left: 100,
  }
})
