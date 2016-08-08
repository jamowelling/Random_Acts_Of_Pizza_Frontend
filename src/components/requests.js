import React, { Component } from 'react';
import { View, Text, AlertIOS, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Button from './button';

export default class Requests extends Component {
  constructor(props) {
    super(props)

    this.state = {
      requests: [],
      errorMessage: ' '
    };
  }
  componentDidMount() {
    fetch('http://localhost:3000/requests')
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage === 'No current requests.') {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.setState({errorMessage: null})
        this.setState({requests: responseJson.requests})
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  onInfoSend() {
    alert(`You have 30 minutes to send a gift card to ${this.state.name}`)
  }
  onConfirmPress() {
    const userID = this.props.user.id;
    const requestID = this.state.id;
    fetch(`http://localhost:3000/requests/1`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({requestID, userID})
    })
    .then((response) => {
      return response.json()})
      .then((responseJson) => {
        this.onInfoSend()
      })
      .catch((error) => {
        console.error(error);
      });
  }
  onDonatePress() {
    AlertIOS.alert(
      'Are you sure you want to donate?',
      'You will have 30 minutes to send a gift certificate from Pizza House.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Donate',
          onPress: this.onConfirmPress.bind(this)
        }
      ]
    )
  }
  onNewRequestPress() {
    this.props.navigator.push({name: 'new_request'});
  }
  onLogoutPress() {
    this.props.navigator.push({name: 'signin'});
  }
  render() {
    let currentRequests;
    if (this.state.errorMessage !== ' ') {
      currentRequests = <Swiper style={styles.wrapper} showsButtons={true}>
        {this.state.requests.map((request, i) => {
          return (
            <View key={i} style={styles.request}>
              <Text style={styles.text}>
                {request.first_name}
              </Text>
              <Text style={styles.text}>
                {request.title}
              </Text>
              <Button text={'Donate'} onPress={this.onDonatePress.bind(this)} />
            </View>
          )
        })}
      </Swiper>
    }
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Button
            styles={styles.toolbarButton}
            text={'Logout'}
            onPress={this.onLogoutPress.bind(this)}
            />

          <Text style={styles.toolbarTitle}>
            RAOP
          </Text>

          <Button
            style={styles.toolbarButton}
            text={'Create Request'}
            onPress={this.onNewRequestPress.bind(this)}
            />
        </View>
        {currentRequests}

        <Text>
          {this.state.errorMessage}
        </Text>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    backgroundColor:'#81c04d',
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'row'
  },
  toolbarTitle: {
    color:'white',
    textAlign:'center',
    fontWeight:'bold',
    flex: 1
  },
  toolbarButton: {
    color:'white',
    textAlign:'center'
  },
  wrapper: {
  },
  request: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
