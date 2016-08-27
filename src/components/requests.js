import React, { Component } from 'react';
import { View, Text, AlertIOS, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Button from './Button';
import Login from './Login';

export default class Requests extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errorMessage: " "
    };
  }
  componentWillMount() {
    fetch('http://localhost:3000/requests')
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage === 'No current requests.') {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.setState({errorMessage: ' '})
        this.props.onEmailChange(responseJson.email)
        this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
        this.props.collectRequests(responseJson.requests)
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  onConfirmPress(request) {
    const userID = this.props.user.id;
    // fetch(`http://localhost:3000/requests/${request.id}`, {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'PATCH',
    //   body: JSON.stringify({userID})
    // })
    // .then((response) => {
    //   return response.json()})
    // .then((responseJson) => {
    //   this.props.collectRequests(responseJson.requests)
    //   this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    this.props.navigator.push({name: 'request'})
  }
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
  onNewRequestPress() {
    this.props.navigator.push({name: 'new_request'});
  }
  onProfilePress() {
    this.props.navigator.push({name: 'userProfile'});
  }
  render() {
    let profileButton;
    if (this.props.user !== null) {
      profileButton = <Button
        styles={styles.toolbarButton}
        text={'Profile'}
        onPress={this.onProfilePress.bind(this)}
        />
    }

    let showLoginDialog;
    if (this.props.user === null) {
      showLoginDialog = <Login
        onUserChange={this.props.onUserChange}
        onEmailChange={this.props.onEmailChange}
        navigator={this.props.navigator}
        />
    }

    let showCreateRequestButton;
    if (this.props.user !== null) {
      showCreateRequestButton = <Button
        style={styles.toolbarButton}
        text={'Create Request'}
        onPress={this.onNewRequestPress.bind(this)}
        />
    }

    let currentRequests;
    if (this.state.errorMessage === " ") {
      currentRequests = <Swiper style={styles.wrapper} showsButtons={true}>
        {this.props.requests.map((request, i) => {
          let requestID = request.id
          let isDonated;
          let showDonateButton;
          let showWelcomePage;
          if (requestID === 1) {
            return showWelcomePage =
            <View key={requestID} style={styles.request}>
              <Text>
                {this.props.totalDonatedPizzas} pizzas have been donated through:
              </Text>
              <Text style={styles.text}>
                {request.title}
              </Text>
            </View>
          } else if (request.donor_id !== null) {
            isDonated = <Text>DONATION RECEIVED!</Text>
          } else if (this.props.user === null) {
            // not logged in
            // no donate button
          } else if (this.props.user.id === request.creator_id) {
            // is not donated
            // no donate button
          } else {
            showDonateButton = <Button text={'Donate'} onPress={this.onDonatePress.bind(this, request)}/>
          }
          return (
            <View key={i} style={styles.request}>
              {isDonated}
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
        })}
      </Swiper>
    }
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>

          {profileButton}

          <Text style={styles.toolbarTitle}>
            RAOP
          </Text>

          {showCreateRequestButton}

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
    paddingTop:80,
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
    fontSize: 25,
    fontWeight: 'bold',
  }
});
