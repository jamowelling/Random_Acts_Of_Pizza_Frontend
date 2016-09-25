import React, { Component } from 'react';
import { AlertIOS, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import VideoExample from './Video';
import Login from './Login';
import Button from './Button';
import GuestView from './GuestView';

export default class Request extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errorMessage: ' ',
    }
  }
  onDonatePress(request) {
    if (this.props.user === null) {
      this.props.onGuestDonation(true)
      this.props.navigator.push({name: 'guestView'})
    } else {
      AlertIOS.alert(
        `Are you sure you want to donate ${request.pizzas} pizza(s)?`,
        `You will have 30 minutes to send an online gift card. Failure to complete the donation could have you removed from the community.`,
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
  }
  onConfirmPress(request) {
    const userID = this.props.user.id;
    fetch(`http://localhost:3000/requests/${request.id}`, {
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
      if (responseJson.errorMessage) {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.collectRequests(responseJson.requests)
        this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
        this.props.collectActiveDonation(responseJson.activeDonation)
        this.setState({errorMessage: ' '})
        this.props.navigator.push({name: 'instructions'})
      }
    })
    .catch((error) => {
      console.error(error);
    });
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
    let request = this.props.request;

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
      showDonateButton =
        <TouchableOpacity onPress={this.onDonatePress.bind(this, request)} >
          <Image
            style={styles.donateButton}
            source={require('../../assets/donate.png')}
            />
        </TouchableOpacity>
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
    let display =
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
        <Text>
          {this.state.errorMessage}
        </Text>
      </View>
    return (
      <View>
        {display}
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
