import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Request from './Request';
import Landing from './Landing';

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
  mapRequestsToArray() {

  }

  render() {
    let noRequests = <Text>Loading...</Text>;
    let currentRequests;
    const showWelcomePage = <Landing request {...this.props} />

    if (this.state.errorMessage === "No current requests.") {
      noRequests = <Text style={styles.text}>
        There are no current requests.
        </Text>
    } else {
      currentRequests =
        <Swiper showsButtons={true}>
          {this.props.requests.map((request, i) => {
            return (
              <Request key={i} request={request} {...this.props}/>
            )
          })}
        </Swiper>
    }

    return (
      <View style={styles.container}>

        {currentRequests}

        {noRequests}

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
  },
});
