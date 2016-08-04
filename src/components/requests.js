import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './button';

export default class Requests extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'loading...',
      hours: '',
      title: '',
      city: '',
      state: '',
      pizzas: '',
      errorMessage: ''
    };
  }
  componentDidMount() {
    fetch('http://localhost:3000/requests/1')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({name: responseJson.request.name})
      this.setState({hours: responseJson.request.hours})
      this.setState({title: responseJson.request.title})
      this.setState({city: responseJson.request.city})
      this.setState({state: responseJson.request.state})
      this.setState({pizzas: responseJson.request.pizzas})
    })
    .catch((error) => {
      console.error(error);
    });
  }
  onDonatePress() {
    // patch route
  }
  onNewRequestPress() {
    this.props.navigator.push({name: 'new_request'});
  }
  onLogoutPress() {
    this.props.navigator.immediatelyResetRouteStack([{name: 'signin'}]);
  }
  render() {
    return (
      <View style={styles.container}>

        <Button
          text={'Logout'}
          onPress={this.onLogoutPress.bind(this)}
          />

        <Button
          text={'Create Request'}
          onPress={this.onNewRequestPress.bind(this)}
          />

        <Text>
          Requests Page
        </Text>

        <Text>
          {this.state.name}
        </Text>

        <Text>
          {this.state.title}
        </Text>

        <Text>
          {this.state.pizzas} Pizzas - {this.state.city}, {this.state.state}
        </Text>

        <Button
          text={'Donate'}
          />

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
  }
});
