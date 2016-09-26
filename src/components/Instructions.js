import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Link from './Link';

export default class Instructions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ' ',
      errorMessage: ' ',
    };
  }
  componentWillMount() {
    const userID = this.props.activeDonation[0].creator_id
    fetch(`http://localhost:3000/users/${userID}`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage) {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.setState({email: responseJson.email})
        this.setState({errorMessage: ' '})
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    const request = this.props.activeDonation
    const vendorURL = {
      pizzaHut: 'https://pizzahutstore.wgiftcard.com/chrome/pizzahut/',
      papaJohns: 'https://papajohns-m.cashstar.com/buy/?ref=PJ1',
      dominos: 'https://dominosstore.wgiftcard.com/responsive/personalize_responsive/chooseDesign/dominos_responsive/1',
    }
    let url;
    console.log(vendorURL.pizzaHut);
    if (request.vendor === "Pizza Hut") {
      url = vendorURL.pizzaHut
    } else if (request.vendor === "Dominos") {
      url = vendorURL.dominos
    } else if (request.vendor === "Papa Johns") {
      url = vendorURL.papaJohns
    }
    return (
      <View>

        <Nav backButton {...this.props} />

        <View style={styles.container}>
          <Text style={styles.text}>
            Instructions Page.
          </Text>
          <Text>
            Copy the email address below:
          </Text>
          <Text>
            {this.state.email}
          </Text>
          <Text>

          </Text>
          <Link url />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 22,
  },
  text: {

  },
})
