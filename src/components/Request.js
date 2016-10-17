import React, { Component } from 'react';
import { AlertIOS, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import VideoExample from './Video';
import Button from './Button';

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
    } else if (this.props.user.id === request.creator_id) {
      this.setState({errorMessage: 'Really, you want to donate to yourself?'})
    } else if (this.props.activeDonation) {
      this.setState({errorMessage: 'You have recently made a donation.'})
    } else {
      AlertIOS.alert(
        `Are you sure you want to donate ${request.pizzas} pizza(s)?`,
        `You will have 30 minutes to send an online gift card. Failure to complete the donation could have you removed from the community.`,
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Donate',
            onPress: this.onConfirmPress.bind(this, request),
          }
        ]
      )
    }
  }
  onConfirmPress(request) {
    const userID = this.props.user.id;
    fetch(`https://inknead.herokuapp.com/requests/${request.id}`, {
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
        this.props.collectActiveDonation(request)
        this.setState({errorMessage: ' '})
        this.props.navigator.push({name: 'instructions'})
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  handleInstructions() {
    this.props.navigator.push({name: 'instructions'})
  }

  render() {
    let hasDonor;
    let showDonateButton;
    let request = this.props.request;
    let activeDonation;

    if (request.donor_id) {
      hasDonor =
        <Image
          style={styles.received}
          source={require('../../assets/received.png')}
          />
      showDonateButton =
        <Image
          style={styles.disabledDonateButton}
          source={require('../../assets/donate.png')}
          />
    } else if (this.props.user === null || this.props.user.id === request.creator_id || this.props.activeDonation) {
      showDonateButton =
        <TouchableOpacity onPress={this.onDonatePress.bind(this, request)} >
          <Image
            style={styles.disabledDonateButton}
            source={require('../../assets/donate.png')}
            />
        </TouchableOpacity>
    } else {
      showDonateButton =
        <TouchableOpacity onPress={this.onDonatePress.bind(this, request)} >
          <Image
            style={styles.donateButton}
            source={require('../../assets/donate.png')}
            />
        </TouchableOpacity>
    }
    if (this.props.activeDonation) {
      activeDonation =
        <View style={styles.instructionsContainer}>
          <TouchableOpacity
            onPress={this.handleInstructions.bind(this)}
            >
            <Text style={styles.instructions}>
              You have an active donation. Click here to view the donation instructions. You will be eligible to donate again 30 minutes after you've completed your active donation.
            </Text>
          </TouchableOpacity>
        </View>
    }
    let requestText;
    if (request.pizzas > 1) {
      requestText =
        <Text style={styles.request}>
          {request.pizzas} pizzas from {request.vendor}
        </Text>
    } else {
      requestText =
        <Text style={styles.request}>
          {request.pizzas} pizza from {request.vendor}
        </Text>
    }
    let timeAgo;
    let displayTime;
    if (request.minutes === 1) {
      timeAgo = request.minutes
      displayTime = `${timeAgo} minute ago`
    } else if (request.minutes < 60) {
      timeAgo = request.minutes
      displayTime = `${timeAgo} minutes ago`
    } else if (Math.round(request.minutes/60) === 1) {
      timeAgo = Math.round(request.minutes/60)
      displayTime = `${timeAgo} hour ago`
    } else {
      timeAgo = Math.round(request.minutes/60)
      displayTime = `${timeAgo} hours ago`
    }
    const display =
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.firstName}>
            {request.first_name}
          </Text>
          <Text style={styles.dateTime}>
            {displayTime}
          </Text>
        </View>

        <VideoExample userRequest {...this.props} />

        {hasDonor}
        {requestText}
        {showDonateButton}
        <Text style={styles.errorMessage}>
          {this.state.errorMessage}
        </Text>
        {activeDonation}
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
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    // borderWidth: 3,
    borderColor: 'yellow',
  },
  header: {
    justifyContent: 'center',
    // borderWidth: 2,
  },
  firstName: {
    flex: 1,
    textAlign: 'center',
    color: '#ce0000',
    fontSize: 25,
    fontWeight: 'bold',
    // borderWidth: 3,
  },
  dateTime: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  request: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    // borderWidth: 3,
    borderColor: 'green',
  },
  donateButton: {
    width: 200,
    height: 100,
  },
  disabledDonateButton: {
    width: 200,
    height: 100,
    opacity: .3,
  },
  received: {
    position: 'absolute',
    zIndex: 1,
    width: 150,
    height: 150,
    left: 100,
  },
  instructionsContainer: {
    zIndex: 1,
    flex: 1,
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
    borderColor: 'green',
    backgroundColor: 'green',
  },
  instructions: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
})
