import React, { Component } from 'react';
import { View } from 'react-native';
import Nav from './Nav';
import Requests from './Requests';

export default class Main extends Component {
  render() {
    return (
      <View>

        <Nav {...this.props}/>

        <Requests {...this.props} />

      </View>
    );
  };
}
