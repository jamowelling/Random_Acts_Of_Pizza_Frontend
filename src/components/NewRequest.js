import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { SegmentedControls } from 'react-native-radio-buttons';
import Nav from './Nav';

export default class NewRequest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      pizzas: '',
      vendor: '',
      video: '',
      errorMessage: ' '
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onPizzasChange = this.onPizzasChange.bind(this);
    this.onVendorChange = this.onVendorChange.bind(this);
  }
  onTitleChange(title) {
    this.setState({title})
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
    if (this.state.title.length < 15) {
      this.setState({errorMessage: 'Your title must be at least 15 characters.'})
    } else if (this.state.pizzas.length < 1) {
      this.setState({errorMessage: 'Please select the number of pizzas you are requesting.'})
    } else if (this.state.vendor.length < 5) {
      this.setState({errorMessage: 'Please choose your preferred pizza place.'})
    } else {
      this.setState({errorMessage: ' '})

      const {
        title,
        pizzas,
        vendor
      } = this.state;
      fetch('http://random-acts-of-pizza.herokuapp.com/requests', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          userID,
          first_name,
          title,
          pizzas,
          vendor,
          video
        })
      })
      .then((response) => {
        return response.json()})
      .then((responseJson) => {
        this.setState({errorMessage: responseJson.errorMessage})
        if (this.state.errorMessage === 'Request has been created.') {
          this.props.navigator.pop();
          this.props.collectRequests(responseJson.requests)
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
  onCancelRequest() {
    this.props.navigator.pop();
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
      3
    ]
    const vendors= [
      "Papa Johns",
      "Dominos",
      "Pizza Hut"
    ]
    return (
      <View>
        <Nav {...this.props} />
        <View style={styles.container}>
          <Button
            text={'Cancel Request'}
            onPress={this.onCancelRequest.bind(this)}
            />
          <Text>
            New Request Form
          </Text>
          <Text style={styles.label}>
            Tell us your story.
          </Text>
          <Button
            text={'Record Video'}
            onPress={this.openVideoRec.bind(this)}
            />
          <Text style={styles.label}>
            How many pizzas do you need?
          </Text>
          <SegmentedControls
            options={ pizzas }
            onSelection={ this.selectPizzas.bind(this) }
            selectedOption={ this.state.pizzas }
            />

          <Text style={styles.label}>
            Who delivers to you?
          </Text>
          <SegmentedControls
            options={ vendors }
            onSelection={ this.selectVendor.bind(this) }
            selectedOption={ this.state.vendor }
            />

          <Text>
            {this.state.errorMessage}
          </Text>


          <Button text={'Submit Request'}
            onPress={this.onSubmitRequest.bind(this)}
            />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18
  },
  input: {
    fontSize: 20,
    padding: 4,
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center',
    textAlign: 'center'
  }
});
