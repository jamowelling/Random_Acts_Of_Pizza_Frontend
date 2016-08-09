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
        this.setState({errorMessage: ' '})
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
  onDonatePress(requestID) {
    const userID = this.props.user.id;
    fetch(`http://localhost:3000/requests/${requestID}`, {
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
        this.setState({errorMessage: responseJson.errorMessage})
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // onDonatePress() {
  //   AlertIOS.alert(
  //     'Are you sure you want to donate?',
  //     'You will have 30 minutes to send a gift certificate from Pizza House.',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel'
  //       },
  //       {
  //         text: 'Donate',
  //         onPress: this.onConfirmPress.bind(this)
  //       }
  //     ]
  //   )
  // }
  onNewRequestPress() {
    this.props.navigator.push({name: 'new_request'});
  }
  onLogoutPress() {
    this.props.navigator.push({name: 'signin'});
  }
  render() {
    let currentRequests;
    if (this.state.errorMessage === ' ') {
      currentRequests = <Swiper style={styles.wrapper} showsButtons={true}>
        {this.state.requests.map((request, i) => {
          let requestID = request.id
          let isDonated;
          let showDonateButton;
          if (request.donor_id !== null) {
            isDonated = <Text>DONATED!</Text>
          } else if (this.props.user.id === request.creator_id) {
            // is not donated
            // no donate button
          } else {
            showDonateButton = <Button text={'Donate'} onPress={this.onDonatePress.bind(this, request.id)}/>
          }
          return (
            <View key={i} style={styles.request}>
              {isDonated}
              <Text style={styles.text}>
                {request.first_name}
              </Text>
              <Text style={styles.text}>
                {request.title}
              </Text>
              {showDonateButton}
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
