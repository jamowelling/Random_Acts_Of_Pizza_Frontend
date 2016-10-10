import React, { Component } from 'react';
import { Clipboard, Linking, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Link from './Link';

export default class Instructions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ' ',
      vendor: this.props.activeDonation.vendor,
      copied: false,
      content: '',
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
  _setClipboardContent = async () => {
    this.setState({copied: true})
    Clipboard.setString(this.state.email);
    try {
      const content = await Clipboard.getString();
      this.setState({content});
    } catch (e) {
      this.setState({content:e.message});
    }
  };
  render() {
    let vendorURL;
    if (this.state.vendor === "Pizza Hut") {
      vendorURL = 'https://pizzahutstore.wgiftcard.com/chrome/pizzahut/'
    } else if (this.state.vendor === "Dominos") {
      vendorURL = 'https://dominosstore.wgiftcard.com/responsive/personalize_responsive/chooseDesign/dominos_responsive/1'
    } else if (this.state.vendor === "Papa Johns") {
      vendorURL = 'https://papajohns-m.cashstar.com/buy/?ref=PJ1'
    }
    let status;
    if (this.state.copied) {
      status = "Email copied to clipboard!"
    } else {
      status = "You have not copied the email."
    }
    return (
      <View style={styles.container}>

        <Nav backButton {...this.props} />

        <View style={styles.wrapper}>
          <Text style={styles.header}>
            Donation Instructions Page
          </Text>
          <Text style={styles.instructions}>
            Step 1: Tap the email below to copy it
          </Text>
          <Text onPress={this._setClipboardContent}>
            {this.state.email}
          </Text>
          <Text style={styles.instructions}>
            Status:
          </Text>
          <Text>
            {status}
          </Text>
          <Text style={styles.instructions}>
            Step 2: Tap the link to purchase gift card
          </Text>
          <Text>
            Paste the email address you copied when prompted for the recipient's email address, and complete the gift card purchase.
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
    textAlign: 'center',
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
