import React, { Component } from 'react';
import { Linking, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Link from './Link';

export default class Instructions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ' ',
      vendor: this.props.activeDonation.vendor,
      errorMessage: 'No Error.',
    };
  }
  componentWillMount() {
    const userID = this.props.activeDonation.creator_id
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
  handleVendorSite = (vendorURL) => {
    Linking.openURL(vendorURL)
  }
  render() {
    let vendorURL;
    if (this.state.vendor === "Pizza Hut") {
      vendorURL = 'https://pizzahutstore.wgiftcard.com/chrome/pizzahut/'
    } else if (this.state.vendor === "Dominos") {
      vendorURL = 'https://dominosstore.wgiftcard.com/responsive/personalize_responsive/chooseDesign/dominos_responsive/1'
    } else if (this.state.vendor === "Papa Johns") {
      vendorURL = 'https://papajohns-m.cashstar.com/buy/?ref=PJ1'
    }
    return (
      <View style={styles.container}>

        <Nav backButton {...this.props} />

        <View style={styles.wrapper}>
          <Text style={styles.header}>
            Instructions Page
          </Text>
          <Text style={styles.instructions}>
            Copy the email address below:
          </Text>
          <Text>
            {this.state.email}
          </Text>
          <Text style={styles.instructions}>
            Purchase Online Gift Card
          </Text>
          <Text>
            Go to the {this.state.vendor} website, paste the email address you copied, and purchase the online gift card.
          </Text>
          <TouchableOpacity
            onPress={this.handleVendorSite.bind(this, vendorURL)}
            style={styles.hyperlinkButton}
            >
            <Text style={styles.hyperlink}>
              {this.state.vendor}
            </Text>
          </TouchableOpacity>
          <Text>
            {this.state.errorMessage}
          </Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 30,
    // borderWidth: 3,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 15,
  },
  hyperlinkButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#3B5998',
    marginBottom: 10,
  },
  hyperlink: {
    color: 'white',
    fontWeight: 'bold',
  },
})
