import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { SegmentedControls } from 'react-native-radio-buttons';
import Nav from './Nav';
import GuestView from './GuestView';

export default class NewRequest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pizzas: '',
      vendor: '',
      video: '',
      errorMessage: ' '
    };
    this.onPizzasChange = this.onPizzasChange.bind(this);
    this.onVendorChange = this.onVendorChange.bind(this);
  }
  onPizzasChange(pizzas) {
    this.setState({pizzas})
  }
  onVendorChange(vendor) {
    this.setState({vendor})
  }
  onSubmitRequest() {
    const userID = this.props.user.id
    const first_name = this.props.user.first_name
    const video = '555.com'
    if (this.state.pizzas.length < 1) {
      this.setState({errorMessage: 'Please select how many pizzas you need.'})
    } else if (this.state.vendor.length < 5) {
      this.setState({errorMessage: 'Please choose your preferred pizza place.'})
    } else {
      this.setState({errorMessage: ' '})

      const {
        pizzas,
        vendor
      } = this.state;
      fetch('http://localhost:3000/requests', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          userID,
          first_name,
          pizzas,
          vendor,
          video
        })
      })
      .then((response) => {
        return response.json()})
      .then((responseJson) => {
        if (responseJson.errorMessage) {
          this.setState({errorMessage: responseJson.errorMessage})
        } else {
          this.props.navigator.pop();
          this.props.collectRequests(responseJson.requests)
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
  openVideoRec() {
    this.props.navigator.push({name: 'camera'});
  }
  selectPizzas(pizzas){
    this.setState({pizzas});
  }
  selectVendor(vendor){
    this.setState({vendor});
  }
  render() {
    const pizzas= [
      1,
      2,
      3,
    ];
    const vendors= [
      "Papa Johns",
      "Dominos",
      "Pizza Hut",
    ];
    let display;
    if (this.props.user === null) {
      display = <GuestView {...this.props} />
    } else {
      display =
      <View>
        <Nav backButton {...this.props} />

        <View style={styles.container}>

          <View style={styles.formTitle}>
            <Text style={styles.title}>
              Submit your pizza request here:
            </Text>
          </View>

          <View>
            <Text style={styles.instructions}>
              Tell us your story.
            </Text>
          </View>

          <Button
            text={'Record Video'}
            onPress={this.openVideoRec.bind(this)}
            />

          <Text style={styles.instructions}>
            How many pizzas do you need?
          </Text>
          <SegmentedControls
            tint={'#ce0000'}
            options={ pizzas }
            onSelection={ this.selectPizzas.bind(this) }
            selectedOption={ this.state.pizzas }
            />

          <Text style={styles.instructions}>
            Who delivers to you?
          </Text>
          <SegmentedControls
            tint={'#ce0000'}
            fontSize={50}
            options={ vendors }
            onSelection={ this.selectVendor.bind(this) }
            selectedOption={ this.state.vendor }
            />

          <View style={styles.errorContainer}>
            <Text style={styles.error}>
              {this.state.errorMessage}
            </Text>
          </View>


          <Button
            style={styles.submitButton}
            text={'Submit Request'}
            onPress={this.onSubmitRequest.bind(this)}
            />
        </View>

      </View>
    }
    return (
      <View>
        {display}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 22,
    backgroundColor: 'white',
    height: 550,
  },
  formTitle: {
    marginBottom: 20.
  },
  title: {
    fontSize: 20,
  },
  instructions: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 15,
  },
  pizzas: {
    tintColor: 'red',
    fontWeight: 'bold',
  },
  vendor: {

  },
  submitButton: {
    backgroundColor: 'gray',
  },
  errorContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  error: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ce0000',
  },
});
