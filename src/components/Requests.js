import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Request from './Request';
import Landing from './Landing';

export default class Requests extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errorMessage: ' ',
    };
  }
  componentWillMount() {
    fetch('http://localhost:3000/requests')
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage) {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.onEmailChange(responseJson.email)
        this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
        this.props.collectRequests(responseJson.requests)
        this.props.handleWelcomeUrl(responseJson.url)
        this.props.collectActiveDonation(responseJson.activeDonation)
        this.setState({errorMessage: "Requests recieved."})
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    // console.log("1");
    let noRequests = <Text>Loading...</Text>;
    let currentRequests;
    const showWelcomePage = <Landing key={"welcome"} request {...this.props} />

    if (this.state.errorMessage === "No current requests.") {
      // console.log("2");
      noRequests = <Text style={styles.text}>
        There are no current requests.
        </Text>;
    } else if (this.state.errorMessage === "Requests recieved.") {
      // console.log("3");
      currentRequests =
        <Swiper
          showsButtons={true}
          style={styles.wrapper}
          >
          {this.props.requests.map((request, i) => {
            return (
              <Request key={i} request={request} {...this.props} />
            )
          })}
        </Swiper>;
        // console.log("currentRequests", currentRequests.props.children);
        currentRequests.props.children.unshift(showWelcomePage);
        // console.log("currentRequests", currentRequests.props.children);
    } else {
      // console.log("4");
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
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 3,
    borderColor: 'black',
  },
  wrapper: {
    height: 500,
    // flex: 1,
    // borderWidth: 3,
    borderColor: 'green',
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
  },
});
